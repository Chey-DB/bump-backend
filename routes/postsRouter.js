const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

router
  .route("/")
  .get(postController.index)
  .post(postController.createPost)
  .patch(postController.updatePost);

router.route("/:id").delete(postController.deletePost);

router.route("/postonly").get(postController.getPostsOnly);
router.route("/questiononly").get(postController.getQuestionsOnly);

module.exports = router;
