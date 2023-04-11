import { StockControler } from "../controllers/StockController";
import express from 'express';
const route = express.Router();


const stockController = new StockControler();

route.post('/new', stockController.create);
route.get('/', stockController.find);
route.post("/:id", stockController.edit);
route.delete("/:id", stockController.deleteStock);

const StockRoutes = route;

export default StockRoutes;
