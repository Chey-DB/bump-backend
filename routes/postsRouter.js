const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

router
  .route("/")
  .get(postController.index)
  .post(postController.create)
  .patch(postController.update);

router.route("/postonly").get(postController.getPostsOnly);
router.route("/questiononly").get(postController.getQuestionsOnly);
router.route("/:id").get(postController.getById);
router.route("/:id").delete(postController.destroy);

module.exports = router;
