import { ProductsStore } from "../models/products";
import supertest from 'supertest';
import app from '../server';

const store = new ProductsStore;
const request = supertest(app);

it('create method should add a product', async () => {
    const result = await store.create('testing', 2000);
    expect(result).toEqual([{
      id: 1,
      name: 'testing',
      price: 2000,
    }]);
  });

it('should return all products',async ()=>{
    const results = await store.index();
    expect(results).toEqual([{
        id: 1,
        name: 'testing',
        price: 2000,
      }]);
})


it('create a product', async () => {
    const responseUser = await request.post('/create/user/').send({firstname: 'uda', lastname: 'city', password: '123'});
    const token = await responseUser.header.authorization;
    const response = await request.post('/create/product').set('authorization', token).send({name: 'desktop', price: '2000'});
    expect(response.status).toBe(200);
    
})

it('get the created product', async ()=>{
    const response = await request.get('/product/2');
    const data = await response.body;
    expect(data).toEqual([{id: 2, name: 'desktop', price: 2000}])
})

it('return all products from endpoint', async ()=>{
  const response = await request.get('/products');
  const data = await response.body;
  expect(data).toEqual([
    {
      id: 1,
      name: 'testing',
      price: 2000,
    },
    {id: 2, name: 'desktop', price: 2000}
  ])
})

it('return all products from database', async ()=>{
  const result = await store.index();
  expect(result).toEqual([
    {
      id: 1,
      name: 'testing',
      price: 2000,
    },
    {id: 2, name: 'desktop', price: 2000}
  ]);
})

it('delete a product from database then see all products minus one', async()=>{
  const delResult = await store.delete(1);
  const result = await store.index();
  expect(result).toEqual([{id: 2, name: 'desktop', price: 2000}]);
})