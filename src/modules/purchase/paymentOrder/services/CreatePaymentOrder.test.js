const factory = require('@root/tests/utils/factory');
const tenantDatabase = require('@src/models').tenant;

describe('Purchase - CreatePaymentOrder', () => {
  describe('when form created', () => {
    it('send approval request email', async () => {
      const message = await new SendEmailApprovalRequest(approvalReqTemplate).call();

      expect(message).toEqual('Send Approval Request Email Success');
    });

    it('add correct new payment order record', async () => {
      const paymentOrder = await new CreatePaymentOrder(tenantDatabase, {
        invoiceId: 'PI0050821',
        downPaymentId: 'DP0050821',
      }).call();

      expect(paymentOrder.invoiceId).toEqual('PI0050821');
      expect(paymentOrder.downPaymentId).toEqual('DP0050821');
    });

    it('add pending status', async () => {
      const paymentOrder = await new CreatePaymentOrder(tenantDatabase, {
        invoiceId: 'PI0050821',
        downPaymentId: 'DP0050821',
      }).call();

      expect(paymentOrder.status).toEqual('pending');
    });

    it('throw error when require date but it doesnt provide in input', async () => {
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          supplierId: 1,
          paymentMethodId: 1,
        }).call();
      }).rejects.toThrow('Date is required');
    });

    it('throw error when require supplier id but it doesnt provide in input', async () => {
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          paymentMethodId: 1,
        }).call();
      }).rejects.toThrow('Supplier id is required');
    });

    it('throw error when require payment method id but it doesnt provide in input', async () => {
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          supplierId: 1,
        }).call();
      }).rejects.toThrow('Payment method id is required');
    });

    it('throw error when supplier id doesnt exist', async () => {
      const supplierId = 1;
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          supplierId,
          paymentMethodId: 1,
        }).call();
      }).rejects.toThrow(`supplier ${supplierId} doesnt exist`);
    });

    it('throw error when amount > available', async () => {
      const invoice = await factory.invoice.create({
        id: 1,
        availableAmount: 1500000,
      });

      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          supplierId: 1,
          paymentMethodId: 1,
          invoiceList: [
            {
              id: 1,
              amount: 2000000,
            },
          ],
        }).call();
      }).rejects.toThrow(`available amount in ${invoice.id} lower than inputted amount`);
    });

    it('throw error when notes more than 255 character', async () => {
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          supplierId: 1,
          paymentMethodId: 1,
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }).call();
      }).rejects.toThrow(`Notes must be lower than 255 character`);
    });

    it('throw error when total invoice different from accumulated invoices amount', async () => {
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          supplierId: 1,
          paymentMethodId: 1,
          invoiceList: [
            {
              id: 1,
              amount: 2000000,
            },
            {
              id: 3,
              amount: 1000000,
            },
          ],
          totalInvoice: 5000000,
        }).call();
      }).rejects.toThrow(`Total invoice must be equal to accumulated invoices amount`);
    });

    it('throw error when total invoice lower than total down payment and total return', async () => {
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          supplierId: 1,
          paymentMethodId: 1,
          totalInvoice: 2000000,
          totalDownPayment: 1500000,
          totalReturn: 1000000,
        }).call();
      }).rejects.toThrow(`Total invoice must be greater than total down payment + total return`);
    });

    it('throw error when total amount doesnt fit the formula', async () => {
      await expect(async () => {
        await new CreatePaymentOrder(tenantDatabase, {
          date: '2022-09-02',
          supplierId: 1,
          paymentMethodId: 1,
          totalInvoice: 2000000,
          totalDownPayment: 500000,
          totalReturn: 500000,
          totalAmount: 1500000,
        }).call();
      }).rejects.toThrow(`Total amount must fit the formula (total invoice - (total down payment + total return))`);
    });
  });
});
