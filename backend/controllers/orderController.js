import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
import { checkStockAndNotify } from './notificationController.js'

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        for (const item of items) {
            const product = await productModel.findById(item._id)
            const sizeData = product.sizes.find(s => s.size === item.size)
            if (!sizeData || sizeData.stock < item.quantity) {
                return res.json({ success: false, message: "Not enough stock for " + item.name })
            }
        }

        for (const item of items) {
            const product = await productModel.findById(item._id)
            const sizeData = product.sizes.find(s => s.size === item.size)
            sizeData.stock -= item.quantity
            await product.save()
        }
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId, {cartData: {}})
        await checkStockAndNotify()
        
        res.json({success: true, message: "Order Placed"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success: true, message: 'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { placeOrder, userOrders, listOrders, updateStatus }
