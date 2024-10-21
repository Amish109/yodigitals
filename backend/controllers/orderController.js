<<<<<<< HEAD
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

=======
const { Orders, OrderDetails, Products, coupon, User } = require('../models');
const { Op } = require('sequelize');



exports.calculateUserBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Orders.findAll({
      where: { userId },
      attributes: ['balance'], 
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

const totalBalance = orders.reduce((total, order) => {
      return total + order.balance;
    }, 0);

    const updatedUser = await User.findByPk(userId);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await updatedUser.update({ credit: totalBalance });

    res.status(200).json({
      success: true,
      totalBalance,
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        credit: updatedUser.credit,
      },
    });
  } catch (error) {
    console.error('Error calculating user balance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9


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
<<<<<<< HEAD
=======
    userId,
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
    shipping_address,
    billing_address,
    order_type,
    delivery_date,
    tracking_number,
    order_source,
<<<<<<< HEAD
    products
=======
    products,
    paid_amount,
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'Products array cannot be empty' });
  }

  try {
<<<<<<< HEAD
    // Calculate the total discount amount based on products and coupon code
    let totalProductPrice = 0;
    let totalDiscountAmount = 0;

    // Loop through each product to calculate total price and discount
=======

    let totalProductPrice = 0;
    let totalDiscountAmount = 0;

>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
    for (const product of products) {
      const { product_id, quantity } = product;
      const productExists = await Products.findByPk(product_id);

      if (!productExists) {
        return res.status(404).json({ message: `Product with id ${product_id} not found` });
      }

<<<<<<< HEAD
      // Calculate the total price and discount for each product
=======
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
      const productTotalPrice = productExists.price * quantity;
      const productDiscount = (productExists.discount || 0) * productTotalPrice / 100;

      totalProductPrice += productTotalPrice;
      totalDiscountAmount += productDiscount;
    }

<<<<<<< HEAD
   
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
=======
    if (coupon_code) {
      const validCoupon = await coupon.findOne({
        where: {
          code: coupon_code,
          active: { [Op.lte]: new Date() },
          expired: { [Op.gte]: new Date() },
        },
      });

      if (validCoupon) {
        totalDiscountAmount += validCoupon.amount;
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
      } else {
        return res.status(400).json({ message: 'Invalid or expired coupon code.' });
      }
    }

    const finalAmount = totalProductPrice - totalDiscountAmount;
<<<<<<< HEAD
=======
    const balance = finalAmount - (paid_amount || 0);

>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
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
<<<<<<< HEAD
      currency,
      discount_amount: totalDiscountAmount, 
=======
      userId,
      currency,
      discount_amount: totalDiscountAmount,
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
      tax_amount,
      shipping_address,
      billing_address,
      order_type,
      delivery_date,
      tracking_number,
<<<<<<< HEAD
      order_source
    });

    // Create OrderDetails for each product
=======
      order_source,
      paid_amount,
      balance,
    });

>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
    for (const product of products) {
      const { product_id, quantity } = product;
      await OrderDetails.create({
        order_id: newOrder.id,
        product_id,
<<<<<<< HEAD
        quantity
      });
    }

    // Respond with the created order and its details
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
      products
=======
        quantity,
      });
    }




        // Recalculate and update user credit based on balance
        const userOrders = await Orders.findAll({ where: { userId }, attributes: ['balance'] });
        const totalBalance = userOrders.reduce((total, order) => total + order.balance, 0);

    const updatedUser = await User.findByPk(userId);

    console.log(userId);
    if (updatedUser) {
      await updatedUser.update({ credit: totalBalance });
    }


    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        ...newOrder.toJSON(),
        paid_amount,
        balance,
      },
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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
              attributes: ['title', 'price', 'identityNumber'],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders with Details
exports.getAllOrdersWithDetails = async (req, res) => {
  try {
    // Destructure filter criteria from query parameters
    const {
      status,
      payment_status,
      userId,
      order_date,
      tracking_number,
      amount_min,
      amount_max,
      delivery_date,
    } = req.query;


    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (payment_status) {
      filter.payment_status = payment_status; 
    }

    if (userId) {
      filter.userId = userId; 
    }

    if (order_date) {
      filter.order_date = {
        [Op.eq]: new Date(order_date), 
      };
    }

    if (tracking_number) {
      filter.tracking_number = {
        [Op.iLike]: `%${tracking_number}%`, 
      };
    }

    if (amount_min || amount_max) {
      filter.amount = {};
      if (amount_min) {
        filter.amount[Op.gte] = amount_min; // Greater than or equal to min amount
      }
      if (amount_max) {
        filter.amount[Op.lte] = amount_max; // Less than or equal to max amount
      }
    }

    if (delivery_date) {
      filter.delivery_date = {
        [Op.eq]: new Date(delivery_date), // Exact match for delivery date
      };
    }

    // Fetch orders with the constructed filter
    const orders = await db.Orders.findAll({
      where: filter,
      include: [
        {
          model: db.OrderDetails,
          as: 'orderDetails',
          include: [
            {
              model: db.Products,
              as: 'product',
              attributes: ['title', 'price', 'identityNumber'],
            },
          ],
        },
      ],
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};


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
    order_source,
    paid_amount,
  } = req.body;

  try {
    const order = await Orders.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Calculate new balance
    const newBalance = amount - (paid_amount || 0);

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
      order_source,
      paid_amount,
      balance: newBalance,
    });

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Soft delete an order
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
      success: true,
      message: 'Order deleted successfully',
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

<<<<<<< HEAD
=======


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
    
//     let totalProductPrice = 0;
//     let totalDiscountAmount = 0;

    
//     for (const product of products) {
//       const { product_id, quantity } = product;
//       const productExists = await Products.findByPk(product_id);

//       if (!productExists) {
//         return res.status(404).json({ message: `Product with id ${product_id} not found` });
//       }

    
//       const productTotalPrice = productExists.price * quantity;
//       const productDiscount = (productExists.discount || 0) * productTotalPrice / 100;

//       totalProductPrice += productTotalPrice;
//       totalDiscountAmount += productDiscount;
//     }

   
//     if (coupon_code) {
//       // console.log(`Searching for coupon with code: ${coupon_code}`);
      
//       const coupons = await coupon.findOne({
//         where: {
//           code: coupon_code,
//           active: { [Op.lte]: new Date() }, 
//           expired: { [Op.gte]: new Date() } 
//         }
//       });


//       if (coupons) {
//         totalDiscountAmount += coupons.amount;
//       } else {
//         return res.status(400).json({ message: 'Invalid or expired coupon code.' });
//       }
//     }

//     const finalAmount = totalProductPrice - totalDiscountAmount;
//     const newOrder = await Orders.create({
//       order_date,
//       amount: finalAmount,
//       status,
//       order_no,
//       payment_status,
//       coupon_code,
//       overall_distributor_price,
//       shipping_method,
//       payment_method,
//       customer_note,
//       currency,
//       discount_amount: totalDiscountAmount, 
//       tax_amount,
//       shipping_address,
//       billing_address,
//       order_type,
//       delivery_date,
//       tracking_number,
//       order_source
//     });

//     // Create OrderDetails for each product
//     for (const product of products) {
//       const { product_id, quantity } = product;
//       await OrderDetails.create({
//         order_id: newOrder.id,
//         product_id,
//         quantity
//       });
//     }

//     // Respond with the created order and its details
//     res.status(201).json({
//       success: true,
//       message: 'Order created successfully',
//       order: newOrder,
//       products
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
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
<<<<<<< HEAD
              attributes: ['title', 'price', 'identityNumber'] 
=======
              attributes: ['title', 'price', 'identityNumber']
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
            }
          ]
        }
      ]
    });

    if (!order) {
<<<<<<< HEAD
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success:true,
      order});
=======
      return res.status(404).json({ status: true,  message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
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

<<<<<<< HEAD
    res.status(200).json({
      success:true,
      orders});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

=======
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
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
<<<<<<< HEAD
    order_source
=======
    order_source,
    paid_amount, 
    balance
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
  } = req.body;

  try {
    const order = await Orders.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

<<<<<<< HEAD
=======
    // Calculate new balance
    const newBalance = amount - (paid_amount || 0);

>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
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
<<<<<<< HEAD
      order_source
    });

    res.status(200).json({
      
      success:true,
=======
      order_source,
      paid_amount,   
      balance: newBalance  
    });

    res.status(200).json({
      success: true,
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

<<<<<<< HEAD


=======
// Soft delete an order
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
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
<<<<<<< HEAD
      success:true,
=======
      success: true,
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
<<<<<<< HEAD

=======
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
