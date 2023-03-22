import { StoreController } from "../controllers/StoreController";
import express from'express';
const route = express.Router();

const storeController = new StoreController();

route.post('/new', storeController.create);
route.get('/', storeController.find);

const StoreRoutes = route;

export default StoreRoutes;
