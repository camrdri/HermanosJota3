const express = require('express');
const Producto = require('../models/Product'); 
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    next(error); 
  }
});

router.post('/', async (req, res, next) => {
    const datosNuevoProducto = req.body;
    try {
        const data = await Producto.create(datosNuevoProducto);
        res.status(201).json(data);
    } catch (error) {
        error.status = 400;
        next(error); 
    }
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const datosProductoActualizado = req.body;
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            datosProductoActualizado,
            {new: true, runValidators: true} 
        );
        if (!productoActualizado) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            next(error);
            return;
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        error.status = 400;
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      next(error);
      return;
    }
    res.status(200).json(productoEliminado);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      next(error);
      return;
    }
    res.status(200).json(producto);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;