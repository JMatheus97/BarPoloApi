import { MesaController } from '../controllers/MesaController';
import express from 'express';
const route = express.Router();

const mesaControler = new MesaController();

route.post('/new', mesaControler.create);
route.get('/', mesaControler.find);

const MesaRoutes = route;

export default MesaRoutes;
