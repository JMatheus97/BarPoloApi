import { AdressController } from "../controllers/AndressController";
import express from 'express';
const route = express.Router();


const adressController =  new AdressController();

route.post('/new', adressController.create);
route.get("/", adressController.find)

const AdressRoutes = route;
export default AdressRoutes;
