const mongoose = require('mongoose');
const request = require("supertest");
const app = require("../app");
const Calendar = require("../models/Calendar");

describe("API endpoints", () => {
    let api;
    let calendarId;
    const port = 3000;
  
    beforeAll((done) => {
      api = app.listen(port, () => {
        console.log(`API is running on port: ${port}`);
        done();
      });
    });
  
    afterAll((done) => {
      console.log("Stopping tests");
      api.close(done);
    });

    afterEach(async () => {
    
      if(calendarId){
        console.log("Cleaning up database and clear calendarID");
        try {
          await Calendar.findByIdAndDelete(calendarID);
          console.log("Test journal entry deleted");
          calendarID = ''
        } catch (err) {
          console.error(err.message);
        }
      }
    });

    it('It responds with 200 with all events', async () => {
        await request(api)
          .get('/calendar')
          .expect(200);
    });

    it('responds with 400 for error searching all', async () => {

      jest.spyOn(Calendar, 'find').mockImplementationOnce(() => {
        throw new Error('Bad Request');
      });
  
      const response = await request(api)
        .get('/calendar')
        .expect(500);
  
      expect(response.body).toBeDefined();
    })

    //create tests

    it('responds with 201 and created journal entry', async () => {
      
      const calendarData = {
        user_id: "test",
        title: "Baby scan",
        start: "18/06/2023",
        end: "18/06/2023"
      }

      const response = await request(api)
        .post('/calendar')
        .send(calendarData)
        .expect(201);
      
      console.log(response._id)
    });
})
