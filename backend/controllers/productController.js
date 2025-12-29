import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
import { checkStockAndNotify } from './notificationController.js'

const addProduct = async ( req, res ) => {
      try {
         const { name, description, price, category, subCategory, sizes, bestseller } = req.body   
         const image1 = req.files.image1 && req.files.image1[0]
         const image2 = req.files.image2 && req.files.image2[0]
         const image3 = req.files.image3 && req.files.image3[0]
         const image4 = req.files.image4 && req.files.image4[0]

         const images = [image1, image2, image3, image4].filter(item => item !== undefined)
         
         let imagesUrl = await Promise.all(
            images.map(async (item) => {
               let result = await cloudinary.uploader.upload(`data:${item.mimetype};base64,${item.buffer.toString('base64')}`, {resource_type:'image'})
               return result.secure_url
            })
         )

         const parsedSizes = JSON.parse(sizes);
         const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: parsedSizes.map(item => ({ size: item.size, stock: Number(item.stock) })),
            images: imagesUrl
         }

         const product = new productModel(productData)
         await product.save()
         await checkStockAndNotify()
         res.json({success:true, message:"Product Added"})
         
      } catch (error) {
            console.log(error)
            res.json({success: false, message:error.message})
      }
}

const listProduct = async ( req, res ) => {
      try {
            const products = await productModel.find({})
            res.json({success:true, products})
      } catch (error) {
            console.log(error)
            res.json({success: false, message:error.message})
      }
}

const removeProduct = async ( req, res ) => {
      try {
            await productModel.findByIdAndDelete(req.body.id)
            res.json({success:true, message:"Product Removed"})
      } catch (error) {
            console.log(error)
            res.json({success: false, message:error.message})
      }
}

const singleProduct = async ( req, res ) => {
      try {
            const { productId } = req.body
            const product = await productModel.findById(productId)
            res.json({success:true, product})
      } catch (error) {
            console.log(error)
            res.json({success: false, message:error.message})
      }
}

const updateStock = async (req, res) => {
    try {
        const { productId, sizes } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        sizes.forEach(item => {
            const sizeIndex = product.sizes.findIndex(s => s.size === item.size);
            if (sizeIndex > -1) {
                product.sizes[sizeIndex].stock = Number(item.stock);
            }
        });
        await product.save();
        await checkStockAndNotify();
        res.json({ success: true, message: "Stock updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProduct, addProduct, removeProduct, singleProduct, updateStock }
