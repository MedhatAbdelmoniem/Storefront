import client from "../client/client";

export class OrdersStore {
    async currentOrder(userID: number){
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id='${userID}';`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get orders , ${err}`)
        }

    }
    async create(user_id: number, status_order: boolean){
        try{
            const conn = await client.connect();
            const sql = `INSERT INTO orders(user_id, status_order) VALUES('${user_id}', '${status_order}') RETURNING *;`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot create order , ${err}`)
        }

    }

    async addProduct(quantity: number, orderID: number, productID: number){
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES (${quantity}, '${orderID}', '${productID}') RETURNING *;`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    async productsInOrder() {
        try {
            const conn = await client.connect()
            const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
}