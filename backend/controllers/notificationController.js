import nodemailer from 'nodemailer';
import productModel from '../models/productModel.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const checkStockAndNotify = async () => {
  try {
    // Safety check
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      console.log('Email credentials not configured. Skipping stock notifications.');
      return;
    }

    const products = await productModel.find({});
    const lowStockProducts = [];

    // Collect low-stock products
    for (const product of products) {
      const totalStock = product.sizes.reduce(
        (acc, size) => acc + size.stock,
        0
      );

      if (totalStock < 10) {
        lowStockProducts.push({
          name: product.name,
          price: product.price,
          stock: totalStock,
          image: product.images?.[0] || 'https://via.placeholder.com/300x200',
        });
      }
    }

    // If none are low-stock, skip email
    if (lowStockProducts.length === 0) {
      console.log('No low-stock products found.');
      return;
    }

    // Build HTML cards
    const productCards = lowStockProducts
      .map(
        (p) => `
        <div style="border:1px solid #eaeaea; border-radius:10px; padding:15px; margin-bottom:20px;">
          <h3 style="margin-top:0;">${p.name}</h3>
          <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:8px; margin-bottom:10px;" />
          <p><strong>💰 Price:</strong> ₹${p.price}</p>
          <p>
            <strong>📦 Stock:</strong> 
            <span style="color:#ff4757; font-weight:bold;">${p.stock}</span>
          </p>
        </div>
      `
      )
      .join('');

    // Send ONE email
    await transporter.sendMail({
      from: `"Clicks & Cart Alerts" <${process.env.EMAIL}>`,
      to: 'admin@example.com',
      subject: `🚨 Low Stock Alert (${lowStockProducts.length} Products)`,
      html: `
        <div style="font-family:Arial, sans-serif; background:#f5f6fa; padding:20px;">
          <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
            
            <div style="background:#ff4757; color:#fff; padding:20px; text-align:center;">
              <h2 style="margin:0;">🚨 Low Stock Alert</h2>
              <p style="margin:5px 0 0;">
                ${lowStockProducts.length} product(s) need restocking
              </p>
            </div>

            <div style="padding:20px;">
              ${productCards}
            </div>

            <div style="background:#f1f2f6; padding:12px; text-align:center; font-size:13px; color:#666;">
              © ${new Date().getFullYear()} Clicks & Cart | Inventory Notification
            </div>
          </div>
        </div>
      `,
    });

    console.log(
      `Low stock email sent for ${lowStockProducts.length} products`
    );
  } catch (error) {
    console.error('Error checking stock and sending notification:', error);
  }
};
