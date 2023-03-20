import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import  AdressRoutes  from './src/routes/AdressRoutes'
import UserRoutes from './src/routes/UserRoutes';
import ProductRoutes from './src/routes/ProductRoutes';
import MesaRoutes from './src/routes/MesaRoutes';

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
app.use('/endereco', AdressRoutes);
app.use('/user', UserRoutes);
app.use('/product', ProductRoutes);
app.use('/mesa', MesaRoutes)

mongoose.set("strictQuery", false);

async function main(){
  await mongoose.connect(url);
  console.log("Conectou ao Mongoose! ");
}

main().catch((err) => console.log(err));

app.listen(5000);

