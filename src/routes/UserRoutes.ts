import express from "express";
import { UserController } from "../controllers/UserContrroller";

const route = express.Router();
const userController = new UserController();


route.post('/new',  userController.create);
route.post('/login', userController.login)

const UserRoutes = route;

export default UserRoutes;
