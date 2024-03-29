import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import UserRoutes from './src/routes/UserRoutes';
import ProductRoutes from './src/routes/ProductRoutes';
import TableRoutes from './src/routes/TableRoutes';
import StoreRoutes from './src/routes/StoreRoutes';
import StockRoutes from './src/routes/StockRoutes';
import EmployeeRoutes from './src/routes/EmployeeRoutes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';


const app = express();

dotenv.config();

let url: string = process.env.MONGO_URI  as string;

//Config JSON response
app.use(express.json());

//Solve Cors
app.use(cors({ credentials: true, origin:  'http://localhost:3000'}));

//Public folter for images
app.use(express.static('public'));

//Routes

app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/user', UserRoutes);
app.use('/product', ProductRoutes);
app.use('/table', TableRoutes)
app.use('/store', StoreRoutes);
app.use('/stock', StockRoutes);
app.use('/employee', EmployeeRoutes);

mongoose.set("strictQuery", false);

async function main(){
  await mongoose.connect(url);
  console.log("Conectou ao Mongoose! ");
}

main().catch((err) => console.log(err));

app.listen(5000);

