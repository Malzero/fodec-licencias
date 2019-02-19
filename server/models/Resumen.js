const mongoose = require('mongoose');

const ResumenSchema = new mongoose.Schema({
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
  dias_pago: {
    type: Number,
    default: 0
  },
  dias_total: {
    type: Number,
    default: 0
  },
  mes_pago: {
    type: String,
    default: ''
  },
  ano_pago: {
    type: String,
    default: ''
  },
  sis_salud: {
    type: String,
    default: ''
  },
  pago_fodec: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    default: 'EN ESPERA'
  },
  recuperado: {
    type: Number,
    default: 0
  },
  perdida: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('resumen', ResumenSchema);
