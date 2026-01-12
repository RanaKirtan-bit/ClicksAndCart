import express from 'express';
import {ordersPerMoth} from '../controllers/reportController.js';


const reportRouter = express.Router()

reportRouter.get('/monthlyorder', ordersPerMoth)

export default reportRouter