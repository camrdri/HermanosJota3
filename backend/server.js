require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Endpoint base
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando y conectado a MongoDB ✅');
});

app.get('/api/productos', async (req, res, next) => {
  try {
    const productos = await Product.find({});
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    next(error);
  }
});

app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Error interno del servidor'
    }
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
