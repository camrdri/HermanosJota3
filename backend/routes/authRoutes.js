const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    
    let usuario = await User.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

  
    usuario = new User({ nombre, email, password });

    
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    let usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }


    const esCorrecta = await bcrypt.compare(password, usuario.password);
    if (!esCorrecta) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

   
    const payload = {
      usuario: { id: usuario.id }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' }, 
      (error, token) => {
        if (error) throw error;

        res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
});

module.exports = router;