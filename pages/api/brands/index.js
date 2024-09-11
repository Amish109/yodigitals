import { Brand } from '../../../models'; // Import the Brand model

const handler = async (req, res) => {
  if (req.method === 'GET') {
    // Handle GET request: Retrieve all brands
    try {
      const brands = await Brand.findAll();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else 
  
  if (req.method === 'POST') {
    // Handle POST request: Create a new brand
    const { name, logo_url } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const newBrand = await Brand.create({ name, logo_url });
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
