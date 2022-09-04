const tenantDatabase = require('@src/models').tenant;

describe('Purchase - RejectAll', () => {
  describe('when created form rejected', () => {
    it('form status rejected', async () => {
      const rejectForm = await new RejectAll(tenantDatabase, {
        ids: [1, 2, 4],
        reason: 'dolor ipsum',
      }).call();

      expect(rejectForm[0].formStatus).toEqual('rejected');
    });

    it('aproval status rejected', async () => {
      const rejectForm = await new RejectAll(tenantDatabase, {
        ids: [1, 2, 4],
        reason: 'dolor ipsum',
      }).call();

      expect(rejectForm[0].approvalStatus).toEqual('pending');
    });

    it('throw error when doesnt fill the reason', async () => {
      await expect(async () => {
        await new RejectAll(tenantDatabase, {
          ids: [1, 2, 4],
        }).call();
      }).rejects.toThrow('Reason is required');
    });

    it('throw error when reason more than 255 character', async () => {
      await expect(async () => {
        await new RejectAll(tenantDatabase, {
          ids: [1, 2, 4],
          reason:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }).call();
      }).rejects.toThrow('Reason must be lower than 255 character');
    });
  });
});
