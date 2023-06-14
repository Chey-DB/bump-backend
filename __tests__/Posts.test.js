const request = require("supertest");
const app = require("../app");

describe("api server", () => {
  let api;
  beforeAll(() => {
    api = app.listen(3000, () => {
      console.log("Test server running on port 3000");
    });
  });

  afterAll((done) => {
    console.log("Stopping test server");
    api.close(done);
  });

  test("testing getting all the posts and questions", async () => {
    await request(app).get("/posts").expect(200);
  });
  test("testing getting all the posts only ", async () => {
    await request(app).get("/posts/postonly").expect(200);
  });
  test("testing getting all the questions only ", async () => {
    await request(app).get("/posts/questiononly").expect(200);
  });

  test("test creating new post", async () => {
    const mockData = {
      user_id: "testin",
      title: "testing_title",
      content: "testing_content",
      image: "testing_image",
      comments: ["testin with no g"],
      question: true,
    };
    await request(app)
      .post("/posts")
      .send(mockData)
      .set("Accept", "application/json")
      .expect(200);
  });

  test("bad request testing for creating a new post", async () => {
    const mockData = {
      user_ids: "testin",
      title: "testing_title",
      content: "testing_content",
      image: "testing_image",
      comments: ["testin with no g"],
      question: true,
    };
    await request(app)
      .post("/posts")
      .send(mockData)
      .set("Accept", "application/json")
      .expect(400);
  });

  test("bad request testing for creating a new post", async () => {
    const mockData = {
      user_ids: "testin",
      title: "testing_title",
      content: "testing_content",
      image: "testing_image",
      comments: ["testin with no g"],
      question: true,
    };
    await request(app)
      .post("/posts")
      .send(mockData)
      .set("Accept", "application/json")
      .expect(400);
  });

  test("testing update feature with status code of 200", async () => {
    const mockData = {
      _id: "64887372acecd8bab23fc832",
      user_id: "testin",
      title: "testing_title",
      content: "testing_content",
      image: "testing_image",
      comments: ["testin with no g"],
      question: true,
    };
    const response = await request(app)
      .patch("/posts")
      .send(mockData)
      .set("Accept", "application/json")
      .expect(200);
  });
  test("testing update feature with status code of 400", async () => {
    const mockData = {
      _id: "",
      user_id: "testin",
      title: "testing_title",
      content: "testing_content",
      image: "testing_image",
      comments: ["testin with no g"],
      question: true,
    };
    const response = await request(app)
      .patch("/posts")
      .send(mockData)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
    console.log(response.statusCode);
  });

  test("testing if i can get one specific code with status code of 200", async () => {
    const mockData = {
      _id: "64887372acecd8bab23fc832",
      user_id: "testin",
      title: "testing_title",
      content: "testing_content",
      image: "testing_image",
      comments: ["testin with no g"],
      question: true,
    };
    const response = await request(app)
      .get(`/posts/${mockData._id}`)
      .expect(200);
  });

  test("testing if post can be deleted and respoond with the code 200", async () => {
    const mockData = {
      _id: "64887372acecd8bab23fc832",
      user_id: "testin",
      title: "testing_title",
      content: "testing_content",
      image: "testing_image",
      comments: ["testin with no g"],
      question: true,
    };
    await request(app).delete(`/posts/${mockData._id}`).expect(200);
  });
});
