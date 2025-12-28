import express from 'express';
import { listProduct, addProduct, removeProduct, singleProduct, getStockLevels, updateStock } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name:'image1', maxCount: 1}, {name:'image2', maxCount: 1}, {name:'image3', maxCount: 1}, {name:'image4', maxCount: 1}]), addProduct);
productRouter.get('/list', listProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/stock-levels', adminAuth, getStockLevels); // Route to fetch stock levels
productRouter.post('/update-stock', adminAuth, updateStock); // Route to update stock

export default productRouter