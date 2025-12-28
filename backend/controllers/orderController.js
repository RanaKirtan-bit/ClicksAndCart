import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
import notificationModel from '../models/notificationModel.js'
import mongoose from 'mongoose'


const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({ seen: false })
      .sort({ createdAt: -1 })

    res.json({ success: true, notifications })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


const placeOrder = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { items, amount, address } = req.body
    const userId = req.userId; // ✅ from auth middleware

    for (const item of items) {
      const product = await productModel
        .findById(item._id)
        .session(session)

      if (!product) {
        throw new Error('Product not found')
      }

      // 🟢 SIZE-WISE PRODUCT
      if (product.sizes && product.sizes.size > 0 && item.size) {
        const currentQty = product.sizes.get(item.size) || 0

        if (currentQty < item.quantity) {
          throw new Error(`Out of stock for size ${item.size}`)
        }

        product.sizes.set(item.size, currentQty - item.quantity)
      }
      // 🔵 NON-SIZE PRODUCT
      else {
        if (product.totalStock < item.quantity) {
          throw new Error('Product out of stock')
        }

        product.totalStock -= item.quantity
      }

      // 🔔 LOW STOCK CHECK
      let lowStock = false

      if (product.sizes && product.sizes.size > 0) {
        lowStock = [...product.sizes.values()].some(qty => qty < 5)
      } else {
        lowStock = product.totalStock < 5
      }

      if (lowStock) {
        const alreadyNotified = await notificationModel.findOne({
          productId: product._id,
          seen: false
        }).session(session)

        if (!alreadyNotified) {
          await notificationModel.create([{
            productId: product._id,
            message: `${product.name} stock is running low`
          }], { session })
        }
      }

      await product.save({ session })
    }

    // 🧾 SAVE ORDER
    await orderModel.create([{
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    }], { session })

    // 🧹 CLEAR CART
    await userModel.findByIdAndUpdate(
      userId,
      { cartData: {} },
      { session }
    )

    await session.commitTransaction()
    session.endSession()

    res.json({ success: true, message: "Order Placed Successfully" })

  } catch (error) {
    await session.abortTransaction()
    session.endSession()

    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.userId
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

export { placeOrder, userOrders, listOrders, updateStatus, getNotifications }
