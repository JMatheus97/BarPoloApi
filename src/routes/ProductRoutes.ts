import { ProductController } from "../controllers/ProductController";
import express from 'express';
const route = express.Router();

const productController  = new ProductController();

route.post('/new', productController.create);
route.get('/', productController.find);

const ProductRoutes = route;

export default ProductRoutes;
