const { Orders, OrderDetails, Products } = require('../models');

// Create Order
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


  
  try {    
  
    const newOrder = await Orders.create({
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


    for (const product of products) {
      const { product_id, quantity } = product;
      const productExists = await Products.findByPk(product_id);
      if (!productExists) {
        return res.status(404).json({ message: `Product with id ${product_id} not found` });
      }

      await OrderDetails.create({
        order_id: newOrder.id,  
        product_id,
        quantity
      });
    }

    // Step 3: Respond with the created order and order details
    res.status(201).json({
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
      include: [{ model: OrderDetails, as: 'orderDetails', include: [{ model: Products, as: 'product' }] }],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllOrdersWithDetails = async (req, res) => {
    try {
      // Fetch all orders with details
      const orders = await Orders.findAll({
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
  
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found' });
      }
  
      // Return all orders with their details
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
