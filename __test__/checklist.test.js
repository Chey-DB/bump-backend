const request = require('supertest');
const app = require('../app');
const Checklist = require('../models/Checklist');


describe('Checklist Routes', () => {
  
    it('should retrieve all checklists', async () => {
    const response = await request(app).get('/checklists');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });
});