const request = require("supertest");
const app = require("../app");
const Journal = require("../models/Journal");

describe("API endpoints", () => {
  let api;
  let journalId;
  let userId = 'testId'
  const port = 4000;

  const journalData = {
    user_id: userId,
    title: "Test Journal",
    content: "This is a test journal entry",
  };

  beforeAll((done) => {
    api = app.listen(port, () => {
      console.log(`Test server running on port: ${port}`);
      done();
    });
  });

  afterAll((done) => {
    console.log("Test server gracefully stopping");
    api.close(done);
  });

  afterEach(async () => {
    
    if(journalId){
      console.log("Cleaning up database and clear JournalId");
      try {
        await Journal.findByIdAndDelete(journalId);
        console.log("Test journal entry deleted");
        journalId = ''
      } catch (err) {
        console.error(err.message);
      }
    }
  });
  
  // /journal endpoint testing
  it('responds with 200 when getting all journal entries', async () => {
    await request(api)
      .get('/journals')
      .expect(200);
  });

  it('responds with 400 for error', async () => {

    jest.spyOn(Journal, 'find').mockImplementationOnce(() => {
      throw new Error('Bad Request');
    });

    const userId = 'testId';

    const response = await request(api)
      .get('/journals')
      .expect(400);

    expect(response.body).toBeDefined();
  });

  // /journal/:id endpoint testing
  it('responds to GET /journals/:id with status 200 and return the body of the entry', async () => {

    try {
      const journal = new Journal(journalData);
      const response = await journal.save();
      journalId = response._id;
    } catch (err) {
      console.log(err.message);
    }
  
    const response = await request(api)
      .get(`/journals/${journalId}`)
      .expect(200)

    expect(response.body).toBeDefined();
    expect(response.body.title).toBe('Test Journal');
    expect(response.body.content).toBe('This is a test journal entry');
  });

  it('responds to GET /journals/:id with status 404 and error message for non-existing journal', async () => {
    const fakeId = '11111aa1a111a111a11aa11a';
  
    const response = await request(api)
      .get(`/journals/${fakeId}`)
      .expect(404);
  
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe('Journal entry not found');
  });

  it('responds to GET /journals/:id with status 404 and error message for incorrectly formated id', async () => {
    const fakeId = 'fakeId';
  
    const response = await request(api)
      .get(`/journals/${fakeId}`)
      .expect(400);
  
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe('Bad Request');
  });

  // /journal/user/:userId endpoint testing
  it('responds to GET /journals/user/:userId with status 200 and show body', async () => {

    try {
      const journal = new Journal(journalData);
      const response = await journal.save();
      journalId = response._id;
    } catch (err) {
      console.log(err.message);
    };

    const response = await request(api)
      .get(`/journals/user/${userId}`)
      .expect(200);

    console.log(response.body[0]);
    expect(response.body[0]).toBeDefined();
    expect(response.body[0].title).toBe('Test Journal');
    expect(response.body[0].content).toBe('This is a test journal entry');
  });

  it('responds with 404 and error message for non-existing user', async () => {
    const fakeId = '11111aa1a111a111a11aa11a';

    const response = await request(api)
      .get(`/journals/user/${fakeId}`)
      .expect(404);

    expect(response.body).toBeDefined();
    expect(response.body.message).toBe('No journal entries found');
  });

  it('responds with 400 and error message for database error for /journal/user/:userId', async () => {

    jest.spyOn(Journal, 'find').mockImplementationOnce(() => {
      throw new Error('Bad Request');
    });

    const userId = 'testId';

    const response = await request(api)
      .get(`/journals/user/${userId}`)
      .expect(400);

    expect(response.body).toBeDefined();
    expect(response.body.error).toBe('Bad Request');
  });

  // delete testing
  it('deletes an existing journal entry', async () => {

    try {
      const journal = new Journal(journalData);
      const response = await journal.save();
      journalId = response._id;
    } catch (err) {
      console.log(err.message);
    }

    const response = await request(api)
      .delete(`/journals/${journalId}`)
      .expect(202)
  });

  it('responds with 404 and error message for non-existing journal entry', async () => {
    const fakeId = '11111aa1a111a111a11aa11a';

    const response = await request(api)
      .delete(`/journals/${fakeId}`)
      .expect(404);

    expect(response.body).toBeDefined();
    expect(response.body.message).toBe('Journal entry not found');
  });

  it('responds with 400 and error message for database error', async () => {

    jest.spyOn(Journal, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Bad Request');
    });

    try {
      const journal = new Journal(journalData);
      const response = await journal.save();
      journalId = response._id;
    } catch (err) {
      console.log(err.message);
    }

    const response = await request(api)
      .delete(`/journals/${journalId}`)
      .expect(400);

    expect(response.body).toBeDefined();
    expect(response.body.error).toBe('Bad Request');
  });

  // create testing

  it('responds with 201 and created journal entry', async () => {

    const response = await request(api)
      .post('/journals')
      .send(journalData)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body._id).toBeDefined();
    expect(response.body.title).toBe('Test Journal');
    expect(response.body.content).toBe('This is a test journal entry');
  });

  it('responds with 400 when creating with wrong validation', async () => {
    const nonValidData = {
      user_id: userId,
      content: "This is a test journal entry",
    }; //Does not contain a title

    const response = await request(api)
      .post('/journals')
      .send(nonValidData)
      .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBeDefined();
  });

  it('responds with 500 and error message', async () => {
    jest.spyOn(Journal.prototype, 'save').mockImplementationOnce(() => {
      throw new Error(); 
    });

    const journalData = {
      user_id: 'testId',
      title: "Test Journal",
      content: "This is a test journal entry",
    };

    const response = await request(api)
      .post('/journals')
      .send(journalData)
      .expect(500);

    expect(response.body).toBeDefined();
    expect(response.body.error).toBe('Server Error');
    expect(response.body.message).toBeDefined();
  });

  // update testing
  it('updates an existing journal entry', async () => {

    const updatedJournal = {
      title: 'Updated Journal',
      content: 'This journal entry has been updated',
    };

    try {
      const journal = new Journal(journalData);
      const response = await journal.save();
      journalId = response._id;
    } catch (err) {
      console.log(err.message);
    }
    

    const response = await request(api)
      .patch(`/journals/${journalId}`)
      .send(updatedJournal)
      .expect(200)

    expect(response.body).toBeDefined();
    expect(response.body.title).toBe('Updated Journal');
    expect(response.body.content).toBe('This journal entry has been updated');
  });

  it('returns 404 when invalid id is used during update', async () => {

    const updatedJournal = {
      title: 'Updated Journal',
      content: 'This journal entry has been updated',
    };

    const fakeId = '11111aa1a111a111a11aa11a'

    const response = await request(api)
      .patch(`/journals/${fakeId}`)
      .send(updatedJournal)
      .expect(404)

    expect(response.body).toBeDefined();
    expect(response.body.error).toBe('Not Found');
    expect(response.body.message).toBe('Journal entry not found');
  });

  it('responds with 400 and error for updating during server error', async () => {
    const updatedJournal = {
      title: 'Updated Journal',
      content: 'This journal entry has been updated',
    };

    try {
      const journal = new Journal(journalData);
      const response = await journal.save();
      journalId = response._id;
    } catch (err) {
      console.log(err.message);
    }
  
    jest.spyOn(Journal, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Bad Request');
    });
  
    const response = await request(api)
      .patch(`/journals/${journalId}`)
      .send(updatedJournal)
      .expect(500);
  
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe('Bad Request');
  });
  
});
