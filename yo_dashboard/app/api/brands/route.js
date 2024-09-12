// pages/api/brands.js
import { NextApiRequest, NextApiResponse } from 'next';
import { sequelize } from '../../models/index';
import Brand from '../../models/Brand';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const brands = await Brand.findAll();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
