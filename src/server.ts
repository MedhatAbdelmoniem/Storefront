import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './endpoints/users'
import productsRoutes from './endpoints/products'
import ordersRoutes from './endpoints/orders'

const app: express.Application = express()

app.use(bodyParser.json())


app.use('/', userRoutes);
app.use('/', productsRoutes);
app.use('/', ordersRoutes);

app.listen(3000)

export default app;