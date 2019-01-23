const Licencia = require('../../models/Licencias');

module.exports = (app) => {

  app.get('/api/admin/licencias/get', (req, res) => {

    Licencia.find({}, (err, licencias) => {
      let licenciasMap = [];
      if(err){
        return res.send({
          success: false,
          message: 'Error del servidor'
        });
      }
      if (licencias.length < 1){
        return res.send({
          success: false,
          message: 'Error, invalido'
        });
      } else {
        let i = 0;
        licencias.forEach(function (licencia) {
          licenciasMap[i] = licencia;
          console.log(licencia);
          i++;
        });
        return res.send(licenciasMap);
      }
    });
  });
  app.post('/api/admin/licencias/post', (req, res) => {
    const {body} = req;
    const {
      colegio,
      rut,
      nombre,
      id_licencia,
      dias,
      fecha_inicio,
      fecha_termino,
      dias_pago,
      mes_pago,
      sis_salud,
      pago_fodec,
      recuperado,
      perdida
    } = body;

    if (!colegio){
      return res.send({
        success: false,
        message: 'Error, colegio no puede estar en vacío'
      })
    }
    if (!rut){
      return res.send({
        success: false,
        message: 'Error, rut no puede estar en vacío'
      })
    }
    if (!nombre){
      return res.send({
        success: false,
        message: 'Error, nombre no puede estar en vacío'
      })
    }
    if (!id_licencia){
      return res.send({
        success: false,
        message: 'Error, id no puede estar en vacío'
      })
    }
    if (!dias){
      return res.send({
        success: false,
        message: 'Error, dias no puede estar en vacío'
      })
    }
    if (!fecha_inicio){
      return res.send({
        success: false,
        message: 'Error, fecha_i no puede estar en vacío'
      })
    }
    if (!fecha_termino){
      return res.send({
        success: false,
        message: 'Error, fecha_t no puede estar en vacío'
      })
    }
    if (!dias_pago){
      return res.send({
        success: false,
        message: 'Error, dias pago no puede estar en vacío'
      })
    }
    if (!mes_pago){
      return res.send({
        success: false,
        message: 'Error, mes pago no puede estar en vacío'
      })
    }
    if (!sis_salud){
      return res.send({
        success: false,
        message: 'Error, sis_salud no puede estar en vacío'
      })
    }
    if (!pago_fodec){
      return res.send({
        success: false,
        message: 'Error, pago fodec no puede estar en vacío'
      })
    }
    if (!recuperado){
      return res.send({
        success: false,
        message: 'Error, recuperado no puede estar en vacío'
      })
    }
    if (!perdida){
      return res.send({
        success: false,
        message: 'Error, perdida no puede estar en vacío'
      })
    }
    Licencia.find({
      id_licencia: id_licencia

    }, (err, previousLicencias) => {
      if (err){
        return res.send('Error: Server error');
      } else if (previousLicencias.length > 0) {
        return res.send('Error: la licencia ya existe');
      }

      //save user
      const newLicencia = new Licencia();
      newLicencia.colegio = colegio;
      newLicencia.rut = rut;
      newLicencia.nombre = nombre;
      newLicencia.id_licencia = id_licencia;
      newLicencia.dias = dias;
      newLicencia.fecha_inicio = fecha_inicio;
      newLicencia.fecha_termino = fecha_termino;
      newLicencia.dias_pago = dias_pago;
      newLicencia.mes_pago = mes_pago;
      newLicencia.sis_salud = sis_salud;
      newLicencia.pago_fodec = pago_fodec;
      newLicencia.recuperado = recuperado;
      newLicencia.perdida = perdida;
      newLicencia.save((err, licencia) => {
        if(err){
          return res.send({
            success: false,
            message: 'Error de servidor'
          });
        }
        if(!licencia)
        {
          return res.send({
            success: false,
            message: 'Licencia no existe'
          })
        }
        return res.send({
          success: true,
          message: 'Licencia ingresaada'
        })
      })
    });

  })
};
