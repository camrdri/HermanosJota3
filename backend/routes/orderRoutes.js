const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware'); 


router.post('/', authMiddleware, async (req, res) => {
  try {

    const { productos, total } = req.body;

    const nuevaOrden = new Order({
      usuario: req.usuario.id,
      productos,
      total
    });

    const ordenGuardada = await nuevaOrden.save();
    res.status(201).json(ordenGuardada);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el pedido' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const ordenes = await Order.find({ usuario: req.usuario.id }).sort({ fecha: -1 });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener pedidos' });
  }
});

module.exports = router;