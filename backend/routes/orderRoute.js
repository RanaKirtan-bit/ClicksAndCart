import express from 'express'
import { placeOrder, userOrders, listOrders, updateStatus } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin routes
orderRouter.get('/list', listOrders)
orderRouter.post('/status', updateStatus)

// User routes
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter