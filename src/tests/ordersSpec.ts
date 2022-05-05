import { OrdersStore } from "../models/orders";

const store = new OrdersStore;

it('should have a currentOrder method', ()=>{
    expect(store.currentOrder).toBeDefined();
})