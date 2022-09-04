const tenantDatabase = require('@src/models').tenant;

describe('Purchase - ApproveAll', () => {
  describe('when created form approved', () => {
    it('form approved', async () => {
      const approveForm = await new ApproveAll(tenantDatabase, {
        ids: [1, 2, 3],
      }).call()

      expect(approveForm[0].status).toEqual('approved')
    })

    it('throw error when form status already approved', async () => {
      await expect(async () => {
        await new ApproveAll(tenantDatabase, {
          ids: [1, 2, 3],
        }).call();
      }).rejects.toThrow('Form already approved');
    });
  })
})