require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://muebleriahermaanosjota.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando y conectado a MongoDB ✅');
});

app.use('/api/productos', productRoutes);
app.use('/api/contacto', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(err.message, err.stack);
  res.status(status).json({
    error: {
      message: err.message || 'Error interno del servidor'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});