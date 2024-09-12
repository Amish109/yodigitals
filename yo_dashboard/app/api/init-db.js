// pages/api/init-db.js
import { connectDB } from '../models/index';

export default async function handler(req, res) {
  await connectDB(); // Establish the DB connection

  res.status(200).json({ message: 'Database connection test completed' });
}
