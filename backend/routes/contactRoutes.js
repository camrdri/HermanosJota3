const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(`Nombre: ${req.body.nombre}, Email: ${req.body.email}, Mensaje: ${req.body.mensaje}`);
    res.status(200).json({ 
        message: 'Tu mensaje ha sido enviado con éxito.' 
    });
});

module.exports = router;