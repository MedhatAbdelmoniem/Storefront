import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { OrdersStore } from '../models/orders';
import express, { Request, Response } from 'express'

const orders = new OrdersStore;
const routes = express.Router();


routes.post('/order/:userid', async function (req: Request, res: Response) {
    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401);
        res.json(`Invalid Token ${err}`)
        return;
    }
    const order = await orders.currentOrder((req.params.userid as unknown) as number);
    res.json(order)
})
export default routes;