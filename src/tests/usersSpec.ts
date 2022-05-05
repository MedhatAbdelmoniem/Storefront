import { UsersStore } from "../models/users";

const store = new UsersStore;

it('create method should add a user and check if it exist', async () => {
    const result = await store.create('firstName', 'lastName', 'test123');
    const test = await store.show(2);
    expect(test).toEqual([{
      id: 2,
      firstname: 'firstName',
      lastname: 'lastName',
      password: result[0].password
    }]);
  });
