const { Joi } = require('celebrate');

const requireAuth = {
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
};

const createPaymentOrder = {
  body: Joi.object({
    paymentType: Joi.string().required(),
    supplierId: Joi.number().required(),
    date: Joi.date().iso().required(),
    paymentAccountId: Joi.number().required(),
    invoices: Joi.array()
      .items({
        id: Joi.number().required(),
        amount: Joi.number().required(),
      })
      .required(),
    downPayments: Joi.array().items({
      id: Joi.number().required(),
      amount: Joi.number().required(),
    }),
    returns: Joi.array().items({
      id: Joi.number().required(),
      amount: Joi.number().required(),
    }),
    others: Joi.array().items({
      coaId: Joi.number().required(),
      notes: Joi.string().allow(null).default(''),
      amount: Joi.number().required(),
      allocationId: Joi.number().required(),
    }),
    totalInvoiceAmount: Joi.number().required(),
    totalDownPaymentAmount: Joi.number().min(0).default(0),
    totalReturnAmount: Joi.number().min(0).default(0),
    totalOtherAmount: Joi.number().min(0).default(0),
    totalAmount: Joi.number().required(),
    approvedBy: Joi.number().required(),
    notes: Joi.string().max(255).trim().allow(null).default(''),
  }),
};

const getPaymentOrderListParams = {
  query: Joi.object({
    dateFrom: Joi.date().iso().allow(null),
    dateTo: Joi.date().iso().allow(null),
    approvalStatus: Joi.string().valid('rejected', 'approved', 'pending').allow(null),
    doneStatus: Joi.string().valid('canceled', 'done', 'pending').allow(null),
    limit: Joi.number().allow(null),
    page: Joi.number().allow(null),
  }),
};

module.exports = {
  requireAuth,
  createPaymentOrder,
  getPaymentOrderListParams,
};