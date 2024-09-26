const { Orders, OrderDetails, Products, coupon } = require('../models');
const { Op } = require('sequelize');
// exports.createOrder = async (req, res) => {
//   const {
//     order_date,
//     amount,
//     status,
//     order_no,
//     payment_status,
//     coupon_code,
//     overall_distributor_price,
//     shipping_method,
//     payment_method,
//     customer_note,
//     currency,
//     discount_amount,
//     tax_amount,
//     shipping_address,
//     billing_address,
//     order_type,
//     delivery_date,
//     tracking_number,
//     order_source,
//     products 
//   } = req.body;

  
//   if (!products || products.length === 0) {
//     return res.status(400).json({ message: 'Products array cannot be empty' });
//   }

//   try {
   
//     const newOrder = await Orders.create({
//       order_date,
//       amount,
//       status,
//       order_no,
//       payment_status,
//       coupon_code,
//       overall_distributor_price,
//       shipping_method,
//       payment_method,
//       customer_note,
//       currency,
//       discount_amount,
//       tax_amount,
//       shipping_address,
//       billing_address,
//       order_type,
//       delivery_date,
//       tracking_number,
//       order_source
//     });

   
//     for (const product of products) {
//       const { product_id, quantity } = product;
//       const productExists = await Products.findByPk(product_id);

//       if (!productExists) {
//         return res.status(404).json({ message: `Product with id ${product_id} not found` });
//       }

//       await OrderDetails.create({
//         order_id: newOrder.id, // Associate the order with OrderDetails
//         product_id,
//         quantity
//       });
//     }

//     // Step 3: Respond with the created order and its details
//     res.status(201).json({
//       success:true,
//       message: 'Order created successfully',
//       order: newOrder,
//       products 
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };



exports.createOrder = async (req, res) => {
  const {
    order_date,
    amount,
    status,
    order_no,
    payment_status,
    coupon_code,
    overall_distributor_price,
    shipping_method,
    payment_method,
    customer_note,
    currency,
    discount_amount,
    tax_amount,
    shipping_address,
    billing_address,
    order_type,
    delivery_date,
    tracking_number,
    order_source,
    products
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'Products array cannot be empty' });
  }

  try {
    // Calculate the total discount amount based on products and coupon code
    let totalProductPrice = 0;
    let totalDiscountAmount = 0;

    // Loop through each product to calculate total price and discount
    for (const product of products) {
      const { product_id, quantity } = product;
      const productExists = await Products.findByPk(product_id);

      if (!productExists) {
        return res.status(404).json({ message: `Product with id ${product_id} not found` });
      }

      // Calculate the total price and discount for each product
      const productTotalPrice = productExists.price * quantity;
      const productDiscount = (productExists.discount || 0) * productTotalPrice / 100;

      totalProductPrice += productTotalPrice;
      totalDiscountAmount += productDiscount;
    }

   
    if (coupon_code) {
      // console.log(`Searching for coupon with code: ${coupon_code}`);
      
      const coupons = await coupon.findOne({
        where: {
          code: coupon_code,
          active: { [Op.lte]: new Date() }, 
          expired: { [Op.gte]: new Date() } 
        }
      });


      if (coupons) {
        totalDiscountAmount += coupons.amount;
      } else {
        return res.status(400).json({ message: 'Invalid or expired coupon code.' });
      }
    }

    const finalAmount = totalProductPrice - totalDiscountAmount;
    const newOrder = await Orders.create({
      order_date,
      amount: finalAmount,
      status,
      order_no,
      payment_status,
      coupon_code,
      overall_distributor_price,
      shipping_method,
      payment_method,
      customer_note,
      currency,
      discount_amount: totalDiscountAmount, 
      tax_amount,
      shipping_address,
      billing_address,
      order_type,
      delivery_date,
      tracking_number,
      order_source
    });

    // Create OrderDetails for each product
    for (const product of products) {
      const { product_id, quantity } = product;
      await OrderDetails.create({
        order_id: newOrder.id,
        product_id,
        quantity
      });
    }

    // Respond with the created order and its details
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
      products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get Order with Details
exports.getOrderWithDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Orders.findByPk(id, {
      include: [
        {
          model: OrderDetails,
          as: 'orderDetails',
          include: [
            {
              model: Products,
              as: 'product',
              attributes: ['title', 'price', 'identityNumber'] 
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success:true,
      order});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders with Details
exports.getAllOrdersWithDetails = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: OrderDetails,
          as: 'orderDetails',
          include: [
            {
              model: Products,
              as: 'product',
              attributes: ['title', 'price', 'identityNumber']
            }
          ]
        }
      ]
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({
      success:true,
      orders});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Update Order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    order_date,
    amount,
    status,
    order_no,
    payment_status,
    coupon_code,
    overall_distributor_price,
    shipping_method,
    payment_method,
    customer_note,
    currency,
    discount_amount,
    tax_amount,
    shipping_address,
    billing_address,
    order_type,
    delivery_date,
    tracking_number,
    order_source
  } = req.body;

  try {
    const order = await Orders.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order with new data
    await order.update({
      order_date,
      amount,
      status,
      order_no,
      payment_status,
      coupon_code,
      overall_distributor_price,
      shipping_method,
      payment_method,
      customer_note,
      currency,
      discount_amount,
      tax_amount,
      shipping_address,
      billing_address,
      order_type,
      delivery_date,
      tracking_number,
      order_source
    });

    res.status(200).json({
      
      success:true,
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.softDeleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Orders.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Soft delete the order
    await order.destroy();

    res.status(200).json({
      success:true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

