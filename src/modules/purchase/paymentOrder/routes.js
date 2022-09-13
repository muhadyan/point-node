const express = require('express');
const { celebrate } = require('celebrate');
const auth = require('@src/modules/auth/services/auth.service');
const requestValidations = require('./requestValidations');
const controller = require('./controller');

const router = express.Router();

// CREATE NEW PAYMENT ORDER
router
  .route('/')
  .post(
    celebrate(requestValidations.requireAuth),
    celebrate(requestValidations.createPaymentOrder),
    auth('create payment order'),
    controller.createPaymentOrder
  );

// GET ALL PAYMENT ORDER
router.route('/').get(
  celebrate(requestValidations.requireAuth),
  celebrate(requestValidations.getPaymentOrderListParams),
  auth('read payment order'),
  controller.findAllPaymentOrder
);

module.exports = router;