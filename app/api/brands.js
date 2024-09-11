import { Brand } from '../../models/brands'; // Ensure this path is correct

export async function GET() {
  try {
    const brands = await Brand.findAll();
    console.log(brands, "Brands fetched successfully");
    
    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, logo_url } = await request.json();
    console.log('Received data:', { name, logo_url });

    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
    }

    // Create a new brand record in the database
    const newBrand = await Brand.create({
      name,
      logo_url,
    });

    // Return the newly created brand with a 201 status
    return new Response(JSON.stringify(newBrand), { status: 201 });
  } catch (error) {
    console.error('Error creating brand:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
