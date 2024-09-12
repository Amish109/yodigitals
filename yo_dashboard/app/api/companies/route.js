import { Brand } from '../../../models/brands'; // Import your Sequelize model

export async function GET() {
  try {
    const brands = await Brand.findAll();
    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, logo_url } = await request.json();
    const newBrand = await Brand.create({ name, logo_url });
    return new Response(JSON.stringify(newBrand), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400 });
  }
}
