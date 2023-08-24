const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const reviewsController = require('../controllers/reviews.controllers')

router.post("/create", reviewsController.createReview)
router.get("/reviews", reviewsController.getAllReviews)
router.post("/likereview", reviewsController.likeReview)


module.exports = router;