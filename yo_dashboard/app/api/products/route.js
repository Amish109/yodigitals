// app/api/products/route.js

import { connectDB } from '../../models/index';
import Product from '../../models/brand';

export async function POST(req) {
  await connectDB(); // Establish the DB connection

  const { name, description, price } = await req.json();

  if (!name || !price) {
    return new Response(JSON.stringify({ error: 'Name and price are required' }), { status: 400 });
  }

  try {
    const product = await Product.create({
      name,
      description,
      price,
    });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}


export async function GET() {
    try {
      const brands = await Product.findAll();
      console.log(brands, "Brands fetched successfully");
      
      return new Response(JSON.stringify(brands), { status: 200 });
    } catch (error) {
      console.error('Error fetching brands:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }