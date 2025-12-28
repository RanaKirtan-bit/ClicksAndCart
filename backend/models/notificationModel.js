import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  message: String,
  seen: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model('Notification', notificationSchema)
