import express from 'express'
import { placeOrder, userOrders, listOrders, updateStatus } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.get('/list', listOrders)
orderRouter.post('/status', updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter