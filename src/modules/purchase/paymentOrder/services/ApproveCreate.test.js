const tenantDatabase = require('@src/models').tenant;

describe('Purchase - ApproveCreate', () => {
  describe('when created form approved', () => {
    it('form approved', async () => {
      const approveForm = await new ApproveCreate(tenantDatabase, {
        id: 1,
      }).call()

      expect(approveForm.status).toEqual('approved')
    })

    it('throw error when form status already approved', async () => {
      await expect(async () => {
        await new ApproveCreate(tenantDatabase, {
          id: 1,
        }).call();
      }).rejects.toThrow('Form already approved');
    });
  })
})