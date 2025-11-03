require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const app = express();
const PORT = process.env.PORT || 4000;
const contactRoutes = require('./routes/contactRoutes');


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Endpoint base
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando y conectado a MongoDB ✅');
});

app.use('/api/productos', productRoutes); 

app.use('/api/contacto', contactRoutes);

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
