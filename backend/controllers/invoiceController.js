const db = require('../models');
const path = require('path');
// Upload and Save Invoice PDF
exports.uploadInvoice = async (req, res) => {
  try {
   
    const uploadedFiles = await Promise.all(
      req.files.map(file => db.Invoice.create({
        filename: file.filename,
        filepath: `/uploads/${file.filename}`
      }))
    );

  
    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading files', error });
  }
};
// Fetch All Invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await db.Invoice.findAll();


    if (!invoices) {
      return res.status(404).json({ message: 'Invoice not found' });
    }


    res.status(200).json({
      success:true,
      invoices
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
};


// View Invoice PDF by ID
exports.viewInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const invoice = await db.Invoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const pdfPath = path.resolve(__dirname, '../uploads', invoice.filename);


    return res.sendFile(pdfPath);
  } catch (error) {
    console.error('Error viewing the file:', error);  
    return res.status(500).json({ message: 'Error viewing the file', error: error.message || error });
  }
};
  

// Delete a invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await db.Invoice.findByPk(id);

    if (!invoice) {
      return res.status(404).json({ error: 'invoice not found' });
    }

    await invoice.destroy();

    return res.status(200).json({success:true, message: 'invoice deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete invoice' });
  }
};