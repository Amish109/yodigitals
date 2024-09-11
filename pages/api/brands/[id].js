import Brand  from '../../../models/brands';


const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    
    try {
      const brand = await Brand.findByPk(id);
      if (brand) {
        res.status(200).json(brand);
      } else {
        res.status(404).json({ error: 'Brand not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else 
  
  
  if (req.method === 'PUT') {
    const { name, logo_url } = req.body;
    try {
      const [updated] = await Brand.update({ name, logo_url }, 
            { where: { id } });
      
      if (updated) {
        const updatedBrand = await Brand.findByPk(id);
        res.status(200).json(updatedBrand);
      } else {
        res.status(404).json({ error: 'Brand not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else 
  
  if (req.method === 'DELETE') {
    // Handle DELETE request: Remove a brand by ID
    try {
      const deleted = await Brand.destroy({ where: { id } });
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Brand not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
