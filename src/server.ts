import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { ProductsStore } from './models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"
const products = new ProductsStore;

app.use(bodyParser.json())

app.get('/products', async function (req: Request, res: Response) {
    const allproducts = await products.index();
    res.json(allproducts)
})

app.get('/product/:id', async function (req: Request, res: Response) {
    const product = await products.show((req.params.id as unknown) as number);
    res.json(product)
})

app.get('/create/product/:name/:price', async function (req: Request, res: Response) {
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

app.listen(3000)
