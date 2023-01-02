const express = require('express');
const parfumController = require('../controllers/parfumController');
const authController = require('../controllers/authController');

const router = express.Router();

// router
//   .route('/')
//   .get(authController.protect, tourController.getAllTours)
//   .post(tourController.createTour);
router
  .route('/')
  .get(authController.protect, parfumController.getAllParfum)
  .post(authController.protect, parfumController.createParfum);

router
  .route('/:id')
  .patch(authController.protect, parfumController.updateParfum)
  .get(authController.protect, parfumController.getParfum)
  .delete(authController.protect, parfumController.deleteParfum);

module.exports = router;
