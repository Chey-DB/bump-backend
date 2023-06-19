const mongoose = require("mongoose");
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
    if (calendarId) {
      console.log("Cleaning up database and clear calendarID");
      try {
        await Calendar.findByIdAndDelete(calendarID);
        console.log("Test Calendar event entry deleted");
        calendarID = "";
      } catch (err) {
        console.error(err.message);
      }
    }
  });

  //Get all avents test
    it("It responds with 200 with all events", async () => {
      await request(app).get("/calendar").expect(200);
    });

    //Error handling when getting all events
    it("responds with 500 for error searching all events", async () => {
      jest.spyOn(Calendar, "find").mockImplementationOnce(() => {
        throw new Error("Bad Request");
      });

      const response = await request(api).get("/calendar").expect(500);

      expect(response.body).toBeDefined();
    });

    //create Event test
    it("responds with 201 and created a new event", async () => {
      
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
        
        expect(response.body).toBeDefined();
            
    });

    it("should return 500 if required fields are missing", async () => {
      const invalidEvent = {
        user_id: "",
        start: "",
        end: "18/06/2023",
        title: "Missing title"
      }

      // Make a POST request to create a new event with missing required fields
      const response = await request(app).post("/calendar").send(invalidEvent);

      // Assert the response
      // expect(response.status);
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create an event");
    });
});
