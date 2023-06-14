const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Checklist = require('../models/Checklist');

describe('Checklist API Endpoints', () => {
    // Define test variables
    let checklistId;
  
    // Clear the Checklist collection before each test
    beforeEach(async () => {
      await Checklist.deleteMany({});
    });
  
    // Test GET /checklists
    describe('GET /checklists', () => {
      it('should retrieve all checklists', async () => {
        // Create sample checklists in the database
        const checklist1 = await Checklist.create({
          user_id: new mongoose.Types.ObjectId(),
          title: 'Checklist 1',
          content: 'Content 1',
          isCompleted: false,
        });
  
        const checklist2 = await Checklist.create({
          user_id: new mongoose.Types.ObjectId(),
          title: 'Checklist 2',
          content: 'Content 2',
          isCompleted: true,
        });
  
        // Make a GET request to retrieve all checklists
        const response = await request(app).get('/checklists');
  
        // Assert the response
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
  
        // Check if the response body contains the created checklists
        const receivedChecklist1 = response.body.find(
          (checklist) => checklist.title === checklist1.title
        );
        expect(receivedChecklist1).toBeDefined();
        expect(receivedChecklist1.content).toBe(checklist1.content);
        expect(receivedChecklist1.isCompleted).toBe(checklist1.isCompleted);
  
        const receivedChecklist2 = response.body.find(
          (checklist) => checklist.title === checklist2.title
        );
        expect(receivedChecklist2).toBeDefined();
        expect(receivedChecklist2.content).toBe(checklist2.content);
        expect(receivedChecklist2.isCompleted).toBe(checklist2.isCompleted);
      });
    });
  
    // Test POST /checklists
    describe('POST /checklists', () => {
      it('should create a new checklist', async () => {
        const newChecklist = {
          user_id: new mongoose.Types.ObjectId(),
          title: 'New Checklist',
          content: 'New Content',
          isCompleted: false,
        };
  
        // Make a POST request to create a new checklist
        const response = await request(app).post('/checklists').send(newChecklist);
  
        // Assert the response
        expect(response.status).toBe(201);
        expect(response.body.checklist).toBeDefined();
        expect(response.body.checklist._id).toBeDefined();
        expect(response.body.checklist.title).toBe(newChecklist.title);
  
        // Check if the checklist exists in the database
        const createdChecklist = await Checklist.findById(response.body.checklist._id);
        expect(createdChecklist).toBeDefined();
        expect(createdChecklist.title).toBe(newChecklist.title);
  
        // Set the checklistId for use in other tests
        checklistId = createdChecklist._id.toString();
      });
  
      // Test case for creating a checklist with missing required fields
      it('should return 500 if required fields are missing', async () => {
        const invalidChecklist = {
          user_id: new mongoose.Types.ObjectId(),
          content: 'Missing Title',
          isCompleted: true,
        };
  
        // Make a POST request to create a new checklist with missing required fields
        const response = await request(app).post('/checklists').send(invalidChecklist);
  
        // Assert the response
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to create checklist item');
      });
    });



    // Test GET /checklists/:id
    describe('GET /checklists/:id', () => {
        it('should retrieve a checklist by ID', async () => {
        // Create a sample checklist in the database
        const checklist = await Checklist.create({
            user_id: new mongoose.Types.ObjectId(),
            title: 'Checklist 1',
            content: 'Content 1',
            isCompleted: false,
        });
    
        // Make a GET request to retrieve the checklist by ID
        const response = await request(app).get(`/checklists/${checklist._id}`);
    
        // Assert the response
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(checklist._id.toString());
        expect(response.body.user_id).toBe(checklist.user_id.toString());
        expect(response.body.title).toBe(checklist.title);
        expect(response.body.content).toBe(checklist.content);
        expect(response.body.isCompleted).toBe(checklist.isCompleted);
        });
    
        // Test case for retrieving a non-existent checklist
        it('should return 404 if checklist does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
    
        // Make a GET request to retrieve a non-existent checklist
        const response = await request(app).get(`/checklists/${nonExistentId}`);
    
        // Assert the response
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Checklist not found');
        });
    });
    
    // Test PUT /checklists/:id
    describe('PUT /checklists/:id', () => {
        it('should update a checklist by ID', async () => {
        // Create a sample checklist in the database
        const checklist = await Checklist.create({
            user_id: new mongoose.Types.ObjectId(),
            title: 'Checklist 1',
            content: 'Content 1',
            isCompleted: false,
        });
    
        const updatedChecklist = {
            title: 'Updated Checklist',
            content: 'Updated Content',
            isCompleted: true,
        };
    
        // Make a PUT request to update the checklist by ID
        const response = await request(app)
            .put(`/checklists/${checklist._id}`)
            .send(updatedChecklist);
    
        // Assert the response
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedChecklist.title);
        expect(response.body.content).toBe(updatedChecklist.content);
        expect(response.body.isCompleted).toBe(updatedChecklist.isCompleted);
    
        // Check if the checklist has been updated in the database
        const updatedChecklistFromDB = await Checklist.findById(checklist._id);
        expect(updatedChecklistFromDB.title).toBe(updatedChecklist.title);
        expect(updatedChecklistFromDB.content).toBe(updatedChecklist.content);
        expect(updatedChecklistFromDB.isCompleted).toBe(updatedChecklist.isCompleted);
        });


        // Test case for updating a non-existent checklist
        it('should return 404 if checklist does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updatedChecklist = {
            title: 'Updated Checklist',
            content: 'Updated Content',
            isCompleted: true,
        };

        // Make a PUT request to update a non-existent checklist
        const response = await request(app)
            .put(`/checklists/${nonExistentId}`)
            .send(updatedChecklist);

        // Assert the response
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Checklist not found');
        });
    });

    // Test DELETE /checklists/:id
    describe('DELETE /checklists/:id', () => {
        it('should delete a checklist by ID', async () => {
        // Create a sample checklist in the database
        const checklist = await Checklist.create({
            user_id: new mongoose.Types.ObjectId(),
            title: 'Checklist 1',
            content: 'Content 1',
            isCompleted: false,
        });

        // Make a DELETE request to delete the checklist by ID
        const response = await request(app).delete(`/checklists/${checklist._id}`);

        // Assert the response
        expect(response.status).toBe(204);

        // Check if the checklist has been deleted from the database
        const deletedChecklist = await Checklist.findById(checklist._id);
        expect(deletedChecklist).toBeNull();
        });

        // Test case for deleting a non-existent checklist
        it('should return 404 if checklist does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        // Make a DELETE request to delete a non-existent checklist
        const response = await request(app).delete(`/checklists/${nonExistentId}`);

        // Assert the response
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Checklist not found');
        });
    });
});
