import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { UsersStore } from '../models/users';
import express, { Request, Response } from 'express'

const users = new UsersStore;
const routes = express.Router();


routes.get('/users', async function (req: Request, res: Response) {
    try {
        jwt.verify(req.headers.authorization as string, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401);
        res.json(`Invalid Token ${err}`)
        return;
    }
    const allUsers = await users.index();
    res.json(allUsers)
})

routes.get('/user/:id', async function (req: Request, res: Response) {
    try {
        jwt.verify(req.headers.authorization as string, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401);
        res.json(`Invalid Token ${err}`)
        return;
    }
    const user = await users.show((req.params.id as unknown) as number);
    res.json(user)
})

routes.post('/create/user/', async function (req: Request, res: Response) {
    const token = jwt.sign({firstname: req.body.firstname, lastname: req.body.lastname}, process.env.TOKEN_SECRET as string)
    const user = await users.create(req.body.firstname, req.body.lastname, req.body.password);
    res.setHeader('Content-Type', 'application/json');
    res.header('Authorization', token);
    res.json(user)
})
export default routes;