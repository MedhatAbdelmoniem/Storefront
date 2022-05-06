import client from "../client/client";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

const {
    BCRYPT_PASSWORD, 
    SALT_ROUNDS,
} = process.env;

export class UsersStore {
    async index(){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get users , ${err}`)
        }

    }

    async show(id : number){
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM users WHERE id='${id}';`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get user , ${err}`)
        }

    }

    
    async create(firstname: string, lastname: string, password: string){
        try{
            const conn = await client.connect();
            const encPassword = bcrypt.hashSync(password + BCRYPT_PASSWORD, parseInt((SALT_ROUNDS as unknown) as string));
            const sql = `INSERT INTO users (firstname, lastname, password) VALUES('${firstname}', '${lastname}', '${encPassword}') RETURNING *;`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot create user , ${err}`)
        }

    }

    async delete(id: number) {
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM users WHERE id='${id}';`
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot delete user , ${err}`)
        }
    }
}