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
    const responseUser = await request.get('/create/user/uda/city/123');
    const token = await responseUser.body.token;
    const response = await request.get('/create/product/desktop/2000').send({token: token});
    expect(response.status).toBe(200);
    
})

it('get the created product', async ()=>{
    const response = await request.get('/product/2');
    const data = await response.body;
    expect(data).toEqual([{id: 2, name: 'desktop', price: 2000}])
})