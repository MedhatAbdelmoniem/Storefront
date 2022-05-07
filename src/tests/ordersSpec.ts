import { OrdersStore } from "../models/orders";
import supertest from 'supertest';
import app from '../server';

const store = new OrdersStore;
const request = supertest(app);

it('should have a currentOrder method', ()=>{
    expect(store.currentOrder).toBeDefined();
})

it('testing the endpoint with no token', async ()=>{
    const response = await request.get('/order/1');
    expect(response.status).toEqual(401);
})