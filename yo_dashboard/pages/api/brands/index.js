import Brand from '../../../models/brands'; 


const handler = async (req, res) => {
  if (req.method === 'GET') {

    try {
      const brands = await Brand.findAll();
      // console.log(brands);
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else 
  
  
  if (req.method === 'POST') {
    const { name, logo_url } = req.body;
    console.log(name);
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
