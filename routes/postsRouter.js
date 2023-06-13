const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();
const postRouter = router;

postRouter
  .route("/")
  .get(postController.index)
  .post(postController.createPost)
  .patch(postController.updatePost);

postRouter.route("/:id").delete(postController.deletePost);

postRouter.route("/postonly").get(postController.getPostsOnly);
postRouter.route("/questiononly").get(postController.getQuestionsOnly);
