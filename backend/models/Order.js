const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      cantidad: { type: Number, default: 1 },
      precio: { type: Number, required: true } // Guardamos el precio del momento de la compra
    }
  ],
  total: { type: Number, required: true },
  estado: { type: String, default: 'confirmado' },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);