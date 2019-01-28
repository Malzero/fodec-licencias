
const Licencia = require('../../models/Licencias');
let fs = require('fs'), path = require('path'), URL = require('url');
let convertExcel = require('js-xlsx');
const fetch = require('node-fetch');

function upLicencia(converted) {

  //sacar state
  //post request al backend
  console.log('muestro converted');
  //console.log(converted);
  fetch('http://localhost:8080/api/admin/licencias/post', {
    method: 'post',
    body: JSON.stringify(converted),
    headers: {'Content-Type' : 'application/json'},
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));

}

module.exports = (app) => {

  //app.use(logit.mw);
 // app.use(cors.mw);


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

  });
  app.get('/api/admin/liencias/convert', (req, res) => {
    let options = [{
      sheet:'1',
      isColOriented: false,
      omitEmtpyFields: false,
    }];
    //console.log("entre a la api convert");
    let src = './test.xls';
    let dst = [];
    let result = [];
    result = convertExcel.readFile(src, {type:'buffer'});
    let sheet = result.SheetNames[0];
    sheet = result.Sheets[sheet];
    result = convertExcel.utils.sheet_to_json(sheet,{header:1});
    //console.log(result);
    let temp=[];
    let col=result[3][0].split(": ")[1];

    result.forEach(function(element){
      if(element.length > 0)
        //get colegio
        if(element.length === 11){
          let resp = {
            colegio: '',
            rut: '',
            nombre: '',
            id_licencia: '',
            dias: 0,
            fecha_inicio: '',
            fecha_termino: '',
            dias_pago: 0,
            mes_pago: '',
            sis_salud: '',
            pago_fodec: 0,
            recuperado: 0,
            perdida: 0,
          } ;

          resp.colegio = col;
          resp.rut = element[2];
          resp.nombre= element[1];
          resp.id_licencia= element[4];
          resp.dias= element[10];
          resp.fecha_inicio= element[6];
          resp.fecha_termino= element[7];
          console.log(element[8]);
          temp.push(resp);
          upLicencia(resp);
        }
    });
    //upLicencia(temp);
    return res.json(temp);
  });




};
