const factory = require('@root/tests/utils/factory');
const tenantDatabase = require('@src/models').tenant;

describe('Purchase - History', () => {
  describe('when get the hostory', () => {
    it('show the history', async () => {
      const user = await factory.user.create({
        firstName: 'John',
        lastName: 'Wick',
      });

      const history = await new History(tenantDatabase, (id = 1)).call();

      expect(history.user).toEqual(`${user.firstName} ${user.lastName}`);
    });
  });
});
