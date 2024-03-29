import { TableController } from '../controllers/TableController';
import express from 'express';
const route = express.Router();

const tableControler = new TableController();

route.post('/new', tableControler.create);
route.get('/', tableControler.find);
route.post('/:id', tableControler.edit)
route.delete('/:id', tableControler.deleteTable)

const MesaRoutes = route;

export default MesaRoutes;
