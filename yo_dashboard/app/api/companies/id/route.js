import { Brand } from '../../../../models/brand'; // Import your Sequelize model

export async function GET({ params }) {
  const { id } = params;
  try {
    const brand = await Brand.findByPk(id);
    if (brand) {
      return new Response(JSON.stringify(brand), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { name, logo_url } = await request.json();
    const [updated] = await Brand.update({ name, logo_url }, { where: { id } });
    if (updated) {
      const updatedBrand = await Brand.findByPk(id);
      return new Response(JSON.stringify(updatedBrand), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400 });
  }
}

export async function DELETE({ params }) {
  const { id } = params;
  try {
    const deleted = await Brand.destroy({ where: { id } });
    if (deleted) {
      return new Response(null, { status: 204 });
    } else {
      return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
