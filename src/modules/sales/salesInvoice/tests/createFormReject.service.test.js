const httpStatus = require('http-status');
const setupTestDbTenant = require('@root/tests/utils/setupTestDbTenant');
const { SalesInvoice, Customer, User, Form } = require('@src/models').tenant;
const ApiError = require('@src/utils/ApiError');
const createFormRejectSalesInvoice = require('../services/createFormApprove.salesInvoice.service');

const errorForbidden = new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

setupTestDbTenant();

describe('createFormRejectSalesInvoice service', () => {
  // eslint-disable-next-line one-var
  let salesInvoice, form, maker, approver, hacker, customer;
  beforeEach(async () => {
    maker = await User.create({});
    approver = await User.create({});
    hacker = await User.create({});
    customer = await Customer.create({});
    salesInvoice = await SalesInvoice.create({
      customerId: customer.id,
    });
    form = await Form.create({
      salesInvoiceId: salesInvoice.id,
      createdBy: maker.id,
      approvalBy: approver.id,
      approvalStatus: 0,
    });
  });

  describe('validation', () => {
    const createFormRejectSalesInvoiceDto = {
      approvalBy: 1,
      approvalReason: 'example reason',
    };

    it('should throw error reject by unwanted user', async () => {
      await expect(createFormRejectSalesInvoice(hacker, form.id, createFormRejectSalesInvoiceDto)).rejects.toThrow(
        errorForbidden
      );
    });

    it('should throw error if salesInvoice is already approved', async () => {
      salesInvoice.form.update({
        approvalStatus: 1,
      });
      await expect(createFormRejectSalesInvoice(approver, form.id, createFormRejectSalesInvoiceDto)).rejects.toThrow();
    });
  });

  describe('success reject create', () => {
    const createFormRejectSalesInvoiceDto = {
      approvalBy: 1,
      approvalReason: 'example reason',
    };

    beforeEach(async () => {
      salesInvoice = await createFormRejectSalesInvoice(approver, form.id, createFormRejectSalesInvoiceDto);
    });

    it('has correct form data', () => {
      expect(form.approvalReason).toEqual(createFormRejectSalesInvoiceDto.approvalReason);
      expect(form.approvalBy).toEqual(createFormRejectSalesInvoiceDto.approvalBy);
      expect(form.approvalStatus).toEqual(-1);
    });
  });
});