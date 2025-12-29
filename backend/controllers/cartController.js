import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body
        
        const product = await productModel.findById(itemId)
        const sizeData = product.sizes.find(s => s.size === size)

        if (!sizeData || sizeData.stock <= 0) {
            return res.json({ success: false, message: "Product out of stock" })
        }

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData || {}
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                if (cartData[itemId][size] < sizeData.stock) {
                    cartData[itemId][size] += 1
                } else {
                    return res.json({ success: false, message: "Cannot add more than available stock" })
                }
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Added To Cart"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body
        
        const product = await productModel.findById(itemId)
        const sizeData = product.sizes.find(s => s.size === size)

        if (!sizeData || quantity > sizeData.stock) {
            return res.json({ success: false, message: "Not enough stock" })
        }

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData || {}
        
        cartData[itemId][size] = quantity
        
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Cart Updated"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData || {}
        
        res.json({success: true, cartData})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addToCart, updateCart, getUserCart }
