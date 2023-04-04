import { ProductController } from "../controllers/ProductController";
import express from 'express';
const route = express.Router();

const productController  = new ProductController();

route.post('/new', productController.create);
route.post('/:id', productController.edit);
route.get('/', productController.find);
route.delete('/:id', productController.deleteProduct)

const ProductRoutes = route;

export default ProductRoutes;
