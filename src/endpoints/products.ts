import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { ProductsStore } from '../models/products';
import express, { Request, Response } from 'express'

const routes = express.Router();
const products = new ProductsStore;

routes.get('/products', async function (req: Request, res: Response) {
    const allproducts = await products.index();
    res.json(allproducts)
})

routes.get('/product/:id', async function (req: Request, res: Response) {
    const product = await products.show((req.params.id as unknown) as number);
    res.json(product)
})

routes.post('/create/product/:name/:price', async function (req: Request, res: Response) {
    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401);
        res.json(`Invalid Token ${err}`)
        return;
    }
    const product = await products.create(req.params.name, (req.params.price as unknown) as number);
    res.json(product)
})
export default routes;