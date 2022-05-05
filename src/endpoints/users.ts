import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { UsersStore } from '../models/users';
import express, { Request, Response } from 'express'

const users = new UsersStore;
const routes = express.Router();


routes.get('/users', async function (req: Request, res: Response) {
    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
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
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401);
        res.json(`Invalid Token ${err}`)
        return;
    }
    const user = await users.show((req.params.id as unknown) as number);
    res.json(user)
})

routes.get('/create/user/:firstname/:lastname/:password', async function (req: Request, res: Response) {
    const token = jwt.sign({firstname: req.params.firstname, lastname: req.params.lastname}, process.env.TOKEN_SECRET as string)
    const user = await users.create(req.params.firstname, req.params.lastname, req.params.password);
    res.json({user: user, token: token})
})
export default routes;