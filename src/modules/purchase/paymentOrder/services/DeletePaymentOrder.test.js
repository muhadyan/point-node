const tenantDatabase = require('@src/models').tenant;

describe('Purchase - DeletePaymentOrder', () => {
  describe('when delete the form', () => {
    it('return form pending status', async () => {
      const paymentOrder = await new DeletePaymentOrder(tenantDatabase, (id = 1)).call();

      expect(paymentOrder.formStatus).toEqual('pending');
    });

    it('return approval pending status', async () => {
      const paymentOrder = await new DeletePaymentOrder(tenantDatabase, (id = 1)).call();

      expect(paymentOrder.approvalStatus).toEqual('pending');
    });

    it('throw error when doesnt fill the reason', async () => {
      await expect(async () => {
        await new DeletePaymentOrder(tenantDatabase, (id = 1)).call();
      }).rejects.toThrow('Reason is required');
    });
  });
});
