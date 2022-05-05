import client from "../client/client";

export class OrdersStore {
    async currentOrder(userID: number){
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id="${userID}";`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get orders , ${err}`)
        }

    }

    async addProduct(quantity: number, orderID: number, productID: number){
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES (${quantity}, '${orderID}', '${productID}');`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
}