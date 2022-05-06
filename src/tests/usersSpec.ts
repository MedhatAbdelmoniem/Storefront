import { UsersStore } from "../models/users";
import supertest from 'supertest';
import app from '../server';

const store = new UsersStore;
const request = supertest(app);

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

it('create a user then see if it exist', async ()=>{
  const responseUser = await request.get('/create/user/t/est/123');
  const token = await responseUser.body.token;
  const response = await request.post('/user/3').send({token: token});
  const data = await response.body;
  expect(data).toEqual([{id: 3, firstname: 't', lastname: 'est', password: responseUser.body.user[0].password}])
})

it('see that endpoint returns all users', async ()=>{
  const responseUser = await request.get('/create/user/testing/users/123');
  const token = await responseUser.body.token;
  const response = await request.post('/users').send({token: token});
  const data = await response.body;
  expect(data.length).toEqual(4)
})

it('see if the database has all the users', async()=>{
  const result = await store.index();
  expect(result.length).toEqual(4);
})

it('see if the database contains users with one less after deleting',async()=>{
  const delResult = await store.delete(1);
  const result = await store.index();
  expect(result.length).toEqual(3);
})