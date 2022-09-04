const factory = require('@root/tests/utils/factory');
const tenantDatabase = require('@src/models').tenant;

describe('Purchase - GetPaymentOrder', () => {
  describe('when get the form', () => {
    let paymentOrderMock;
    beforeEach(async (done) => {
      paymentOrderMock = await factory.paymentOrder.create({
        id: 1,
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
      });

      done();
    });

    it('show the data', async () => {
      const paymentOrder = await new CreatePaymentOrder(tenantDatabase, (id = 1)).call();

      expect(paymentOrder).toEqual(paymentOrderMock);
    });
  });
});
