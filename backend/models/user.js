const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Se guardará encriptada
  rol: { type: [String], default: ["cliente"] },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);