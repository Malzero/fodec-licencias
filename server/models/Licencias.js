const mongoose = require('mongoose');

const LicenciaSchema = new mongoose.Schema({
  colegio: {
    type: String,
    default: ''
  },
  rut: {
    type: String,
    default: ''
  },
  nombre: {
    type: String,
    default: ''
  },
  id_licencia: {
    type: String,
    default: ''
  },
  dias: {
    type: Number,
    default: 0
  },
  fecha_inicio: {
    type: String,
    default: ''
  },
  fecha_termino: {
    type: String,
    default: ''
  }
});


module.exports = mongoose.model('licencias', LicenciaSchema);
