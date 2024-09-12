import { Brand } from '../../models/brands'; // Import your Sequelize model

export async function GET() {
  try {
    const brands = await Brand.findAll();
    console.log(brands,"xxxxxxxxxxxxxxx");
    
    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, logo_url } = await request.json();
    
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
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

