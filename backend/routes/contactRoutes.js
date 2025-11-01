const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('Mensaje de contacto recibido (logueado, no guardado en DB):', req.body.email);
    res.status(200).json({ 
        message: 'Tu mensaje ha sido enviado con éxito.' 
    });
});

module.exports = router;