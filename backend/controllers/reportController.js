import orderModel from "../models/orderModel.js"

const startOfMonth = new Date();
startOfMonth.setDate(1);
startOfMonth.setHours(0,0,0,0);

const ordersPerMoth = async (req, res) =>  {
      try {
            const orders = await orderModel.find({
                  createdAt: {$gt: startOfMonth}
            });
            res.json({success: true, orders})
      }catch (error) {
            res.json({success: false, message: error.message});
      }
} 

export { ordersPerMoth }