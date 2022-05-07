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
  const responseUser = await request.post('/create/user').send({firstname: 't', lastname: 'est', password:'123'});
  const token = await responseUser.header.authorization;
  const response = await request.get('/user/3').set('authorization',token);
  const data = await response.body;
  expect(data).toEqual([{id: 3, firstname: 't', lastname: 'est', password: responseUser.body[0].password}])
})

it('see that endpoint returns all users', async ()=>{
  const responseUser = await request.post('/create/user').send({firstname: 'testing', lastname: 'users', password: '123'});
  const token = await responseUser.header.authorization;
  const response = await request.get('/users').set('authorization',token);
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