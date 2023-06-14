const request = require("supertest");
const app = require("../app");
const Post = require("../models/Post");

// it('responds with 400 for error', async () => {

//   jest.spyOn(Journal, 'find').mockImplementationOnce(() => {
//     throw new Error('Bad Request');
//   });

//   const userId = 'testId';

//   const response = await request(api)
//     .get('/journals')
//     .expect(400);

//   expect(response.body).toBeDefined();

describe("api server", () => {
  let api;
  let postId;

  const mockData = {
    user_id: "testin",
    title: "testing_title",
    content: "testing_content",
    image: "testing_image",
    comments: ["testin with no g"],
    question: true,
  };

  beforeAll(() => {
    api = app.listen(3000, () => {
      console.log("Test server running on port 3000");
    });
  });

  afterAll((done) => {
    console.log("Stopping test server");
    api.close(done);
  });

  // afterEach(async () => {
  //   if (postId) {
  //     console.log("Cleaning up database and clear postId");
  //     try {
  //       await Post.findByIdAndDelete(postId);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // });

  test("testing getting all the posts and questions", async () => {
    await request(app).get("/posts").expect(200);
  });

  test("testing getting all the posts only ", async () => {
    await request(app).get("/posts/postonly").expect(200);
  });

  test("testing getting all the questions only ", async () => {
    await request(app).get("/posts/questiononly").expect(200);
  });

  test("testing bad request for posts and display status code of 500", async () => {
    jest.spyOn(Post, "find").mockImplementationOnce(() => {
      throw new Error("Bad Request");
    });
    await request(app).get("/posts").expect(400);
  });

  test("testing bad request for postsonly and display status code of 400", async () => {
    jest.spyOn(Post, "find").mockImplementationOnce(() => {
      throw new Error("Bad Request");
    });
    await request(app).get("/posts/postonly").expect(400);
  });

  test("testing bad request for question only and display status code of 400", async () => {
    jest.spyOn(Post, "find").mockImplementationOnce(() => {
      throw new Error("Bad Request");
    });
    await request(app).get("/posts/questiononly").expect(400);
  });

  test("test creating new post and expect status code of 200", async () => {
    const response = await request(app)
      .post("/posts")
      .send(mockData)
      .set("Accept", "application/json")
      .expect(200);
    postId = response.body._id;
    console.log(postId);
  });

  test("bad request testing for creating a new post with status code of 400", async () => {
    const response = await request(app)
      .post("/posts")
      .send({ user_ids: 11 })
      .set("Accept", "application/json")
      .expect(400);
  });
  test("bad request testing for creating a new post with status code of 500", async () => {
    jest.spyOn(Post, "create").mockImplementationOnce(() => {
      throw new Error("Bad Request");
    });
    const response = await request(app)
      .post("/posts")
      .send("hi")
      .set("Accept", "application/json")
      .expect(500);
  });

  test("testing update feature with status code of 200", async () => {
    const mockData = {
      _id: postId,
      user_id: "update_testin",
      title: "upadate_testing_title",
      content: "update_testing_content",
      image: "update_testing_image",
      comments: ["update_testin with no g"],
      question: false,
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
  });

  test("testing if i can get one specific code with status code of 200", async () => {
    const response = await request(app).get(`/posts/${postId}`).expect(200);
  });
  test("testing if i can get one specific code with status code of 404", async () => {
    const response = await request(app)
      .get("/posts/id_that_does_not_exists")
      .expect(404);
  });

  test("testing if post can be deleted and respoond with the code 200", async () => {
    await request(app).delete(`/posts/${postId}`).expect(200);
  });
  test("testing if post with the wrong id is sent and respoond with the code 404", async () => {
    await request(app).delete(`/posts/111`).expect(404);
  });
});
