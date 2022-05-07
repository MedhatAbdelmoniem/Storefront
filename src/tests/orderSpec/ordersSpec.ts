import { OrdersStore } from "../../models/orders";
import supertest from 'supertest';
import app from '../../server';

const store = new OrdersStore;
const request = supertest(app);

it('should have a currentOrder method', ()=>{
    expect(store.currentOrder).toBeDefined();
})

it('testing the endpoint with no token', async ()=>{
    const response = await request.get('/order/1');
    expect(response.status).toEqual(401);
})

it('creating an order', async ()=>{
    const result = await store.create(2, false);
    expect(result).toEqual([{
        id: 1,
        user_id: '2',
        status_order: false
    }])
})

it('return the created order', async ()=>{
    const result = await store.currentOrder(2);
    expect(result).toEqual([{
        id: 1,
        user_id: '2',
        status_order: false
    }])
})


it('testing to add a product into order_products', async ()=>{
    const result = await store.addProduct(12, 1, 2);
    expect(result).toEqual([{
        id: 1,
        quantity: 12,
        product_id: '2',
        order_id: '1'
    }])
  })
