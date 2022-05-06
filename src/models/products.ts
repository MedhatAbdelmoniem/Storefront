import client from "../client/client";

export class ProductsStore {
    async index(){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get products , ${err}`)
        }

    }

    async show(id : number){
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM products WHERE id='${id}';`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get product , ${err}`)
        }

    }

    
    async create(name: string, price: number){
        try{
            const conn = await client.connect();
            const sql = `INSERT INTO products(name, price) VALUES('${name}', '${price}') RETURNING *;`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot create product , ${err}`)
        }

    }

    async delete(id: number) {
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM products WHERE id='${id}';`
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot delete product , ${err}`)
        }
    }
}