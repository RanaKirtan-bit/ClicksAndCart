import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      images: { type: [String], required: true },
      category: { type: String, required: true },
      subCategory: { type: String, required: true },
      sizes: { type: [String], required: true },
      bestseller: { type: Boolean, default:false },
      stock: { type: Number, required: true, default: 0 } 
},{ timestamps: true })

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema)
export default productModel