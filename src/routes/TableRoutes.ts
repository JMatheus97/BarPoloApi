import { TableController } from '../controllers/TableController';
import express from 'express';
const route = express.Router();

const tableControler = new TableController();

route.post('/new', tableControler.create);
route.get('/', tableControler.find);

const MesaRoutes = route;

export default MesaRoutes;
