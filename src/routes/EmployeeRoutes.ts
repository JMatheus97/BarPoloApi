import express from 'express'
import { EmployeeController } from '../controllers/EmployeeController';
const route = express.Router();

const employeeController = new EmployeeController();

route.post('/new', employeeController.create);
route.get('/', employeeController.find);

const EmployeeRoutes = route;

export default EmployeeRoutes;
