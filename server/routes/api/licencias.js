const Licencia = require('../../models/Licencias');
const Resumen = require('../../models/Resumen');
let convertExcel = require('js-xlsx');
const fetch = require('node-fetch');
let fs = require('fs');
let util = require('util');
let multiparty = require('multiparty');

const centCosto =
    [{
      7: 'LICEO SANTA TERESA',
      6: 'COLEGIO SAGRADO CORAZON DE JESUS',
      13: 'LICEO SAN JOSE',
      12: 'LICEO JUAN XXIII-EL BELLOTO',
      9: 'COLEGIO SAN PIO X',
      11: 'LICEO JOSE CORTES BROWN-CERRO CASTILLO',
      4: 'COLEGIO DE LA SANTA CRUZ',
      15: 'COLEGIO TERESA DE LOS ANDES-ALGARROBO',
      14: 'LICEO JUAN XXIII-VILLA ALEMANA',
      3: 'COLEGIO SANTA FILOMENA',
      8: 'COLEGIO HNO.EUGENIO EYRAUD',
      2: 'LICEO SAN ISIDRO',
      18: 'COLEGIO JUAN PABLO II',
      10: 'COLEGIO SAN AGUSTIN',
      17: 'ESCUELA EL AVE MARIA',
      16: 'LICEO SANTA TERESA DE LOS ANDES-MIRAFLORES',
      1: 'COLEGIO NIÑO JESUS DE PRAGA',
      5: 'ESCUELA PURISIMA DE LO VASQUEZ',
      19: 'LICEO JOSE CORTES BROWN-RECREO',
      20: 'INSTANCIA CENTRAL',
    }];

let buff;

const meses =
  [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];


function upLicencia(converted) {

  //sacar state
  //post request al backend

  fetch('http://192.168.1.159:8080/api/admin/licencias/post', {
    method: 'post',
    body: JSON.stringify(converted),
    headers: {'Content-Type' : 'application/json'},
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}
function upResumen(converted) {

  //sacar state
  //post request al backend

  fetch('http://192.168.1.159:8080/api/admin/licencias/post2', {
    method: 'post',
    body: JSON.stringify(converted),
    headers: {'Content-Type' : 'application/json'},
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}
function upConvert() {

  //sacar state
  //post request al backend
  fetch('http://192.168.1.159:8080/api/admin/licencias/convert', {
    method: 'get',
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}
function upConvert2() {

  //sacar state
  //post request al backend
  fetch('http://192.168.1.159:8080/api/admin/licencias/convert2', {
    method: 'get',
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}
function upConvert3() {

  //sacar state
  //post request al backend
  fetch('http://192.168.1.159:8080/api/admin/licencias/convert3', {
    method: 'get',
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}
function buscaRut(rut, element, mes, ano){

  Resumen.find({ rut: rut }).exec()
    .then(function (doc){
      if (doc.length > 0){
        console.log(rut);
        console.log(doc);
          let mes_pago;
          let ano_pago;
          console.log(doc);
          mes_pago = doc[0].mes_pago;
          ano_pago = doc[0].ano_pago;

          console.log(parseInt(element[13]));
          console.log(mes_pago + '=' + mes);
          console.log(ano_pago + '=' + ano);
          if (mes_pago === mes && ano_pago === ano) {

            console.log(doc[0].recuperado);
            doc[0].recuperado = doc[0].recuperado + parseInt(element[13]);
            console.log(doc[0].recuperado);
            doc[0].save();
            console.log('recuperado ingresado' + element[13]);

          }
      }
    })
    .then(undefined, function (err) {
      console.log(err)
    })
    .then(getUpdate());

}
function getUpdate() {
  fetch('http://192.168.1.159:8080/api/admin/licencias/update_per')
    .then(results => results.json())
    .catch(error => console.log("error update", error))
}

module.exports = (app) => {

  app.post('/api/admin/licencias/get', (req, res) => {

    const rut = req.body.rut;

    Licencia.find({rut:rut}, (err, licencias) => {
      let licenciasMap = [];

      if (licencias.length === 0) {
        console.log(licencias.length);
        return res.send(licenciasMap);
      }
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
      }
 else {
        let i = 0;
        licencias.forEach(function (licencia) {
          licenciasMap[i] = licencia;
          i++;
        });

        return res.send(licenciasMap);
      }
    });
  });
  app.get('/api/admin/licencias/get2', (req, res) => {

    Resumen.find({}, (err, resumenes) => {
      let resumenMap = [];

      if (resumenes.length === 0) {
        console.log(resumenes.length);
        return res.send(resumenMap);
      }
      if(err){
        return res.send({
          success: false,
          message: 'Error del servidor'
        });
      }
      if (resumenes.length < 1){
        return res.send({
          success: false,
          message: 'Error, invalido'
        });
      }
      else {
        let i = 0;
        resumenes.forEach(function (resumen) {
          resumenMap[i] = resumen;
          i++;
        });

        return res.send(resumenMap);
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
          message: 'Licencia ingresada'
        })
      })
    });

  });
  app.post('/api/admin/licencias/post2', (req, res) => {
    const {body} = req;
    const {
      rut,
      nombre,
      colegio,
      dias_pago,
      dias_total,
      mes_pago,
      ano_pago,
      sis_salud,
      pago_fodec,
      recuperado,
      perdida,
    } = body;

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

    let ver = 0;
    //Verifico que np exista la misma licencia
    //Licencia repetida: mismo rut, mes_pago y ano_pago
    Resumen.find({
      rut: rut
    }, (err, previousResumen) => {

      if (err){
        return res.send({
          success: false,
          message: 'Error en el servidor'
        })
      } else if (previousResumen.length > 0) {
        console.log("encontre un rut igual");
        //SI encuentra una licencia con el mismo rut pasa a la siguiente verificación
        Resumen.find({
          mes_pago: mes_pago

        }, (err, previousPreviousResumen) => {
            if (err) {
              return res.send({
                success: false,
                message: 'Error en el servidor'
              })
            } else if (previousPreviousResumen.length > 0) {
              console.log("encontre un mes_pago igual");
              //Si encuentra una licencia con el mismo mes paso a la otra verificación
              Resumen.find({
                  ano_pago: ano_pago

                }, (err, previousPreviousPreviousResumen) => {
                  if (err) {
                    //console.log(err);
                    return res.send({
                      success: false,
                      message: 'Error en el servidor'
                    })

                  } else if (previousPreviousPreviousResumen.length > 0) {
                    console.log("encontre un ano_pago igual");
                    //SI encuentra una licencia con el mismo año retorno licencia ya existente

                    console.log('Licencia no ingresada  por existir en base de datos');
                  }
                  else {
                      const newResumen = new Resumen();
                      newResumen.rut = rut;
                      newResumen.colegio = colegio;
                      newResumen.nombre = nombre;
                      newResumen.dias_pago = Number(dias_pago);
                      newResumen.dias_total = Number(dias_total);
                      newResumen.mes_pago = mes_pago;
                      newResumen.ano_pago = ano_pago;
                      newResumen.sis_salud = sis_salud;
                      newResumen.pago_fodec = Number(pago_fodec);
                      newResumen.recuperado = Number(recuperado);
                      newResumen.perdida = Number(perdida);
                      newResumen.save((err, resumen) => {
                        if(err){
                          //console.log(err);
                          return res.send({
                            success: false,
                            message: 'Error de servidor al subir'
                          });
                        }
                        if(!resumen)
                        {
                          return res.send({
                            success: false,
                            message: 'Licencia no existe'
                          })
                        }
                        return res.send({
                          success: true,
                          message: 'Licencia ingresada'
                        })
                      });
                  }
                }
              );
            }
            else {
              const newResumen = new Resumen();
              newResumen.rut = rut;
              newResumen.nombre = nombre;
              newResumen.colegio = colegio;
              newResumen.dias_pago = Number(dias_pago);
              newResumen.dias_total = Number(dias_total);
              newResumen.mes_pago = mes_pago;
              newResumen.ano_pago = ano_pago;
              newResumen.sis_salud = sis_salud;
              newResumen.pago_fodec = Number(pago_fodec);
              newResumen.recuperado = Number(recuperado);
              newResumen.perdida = Number(perdida);
              newResumen.save((err, resumen) => {
                if(err){
                  //console.log(err);
                  return res.send({
                    success: false,
                    message: 'Error de servidor al subir'
                  });
                }
                if(!resumen)
                {
                  return res.send({
                    success: false,
                    message: 'Licencia no existe'
                  })
                }
                return res.send({
                  success: true,
                  message: 'Licencia ingresada'
                })
              });
            }
          }
        );
      }
      else {
        const newResumen = new Resumen();
        newResumen.rut = rut;
        newResumen.nombre = nombre;
        newResumen.colegio = colegio;
        newResumen.dias_pago = Number(dias_pago);
        newResumen.dias_total = Number(dias_total);
        newResumen.mes_pago = mes_pago;
        newResumen.ano_pago = ano_pago;
        newResumen.sis_salud = sis_salud;
        newResumen.pago_fodec = Number(pago_fodec);
        newResumen.recuperado = Number(recuperado);
        newResumen.perdida = Number(perdida);
        newResumen.save((err, resumen) => {
          if(err){
            //console.log(err);
            return res.send({
              success: false,
              message: 'Error de servidor al subir'
            });
          }
          if(!resumen)
          {
            return res.send({
              success: false,
              message: 'Licencia no existe'
            })
          }
          return res.send({
            success: true,
            message: 'Licencia ingresada'
          })
        });
      }

    });




  });
  app.get('/api/admin/licencias/update_per', (req, res) => {

    Resumen.find({}, function (err, resumenes) {

    if (err){
      return res.send({
        success: false,
        message: 'Error'
      })
    }
    else {
      for (let i=0; i<resumenes.length; i++) {
        Resumen.findOne({ rut: resumenes[i].rut }, function (err, doc){
          if (doc.perdida === 0)
          {
            doc.perdida = (doc.recuperado - doc.pago_fodec) * -1 ;
            doc.save();
          }

        });
      }
      return res.send({
        success: true,
        message: 'Pérdida ingresadas '
      })

    }});
  });


  app.get('/api/admin/licencias/convert', (req, res) => {
    let options = [{
      sheet:'1',
      isColOriented: false,
      omitEmtpyFields: false,
    }];


    let dir_xls = './server/uploads/files/softland1/Softland1.xls';
    let dir_xlsx = './server/uploads/files/softland1/Softland1.xlsx';

    let src;

    if (fs.existsSync(dir_xls))
    {
      src = dir_xls;
    }
    else if (fs.existsSync(dir_xlsx))
    {
      src = dir_xlsx;
    }
    else{
      return res.send({
        success: false,
        message: 'Error, no existe archivo para convertir'
      })
    }

    result = convertExcel.readFile(src, {type:'buffer', cellDates:true, cellText:false});
    let sheet = result.SheetNames[0];
    sheet = result.Sheets[sheet];
    result = convertExcel.utils.sheet_to_json(sheet,{header:1, dateNF:"DD-MM-YYYY"});
    let temp=[];
    let dateformated;

    result.forEach(function(element){
      if(element.length > 0 )
        //get colegio
        if(element.length === 8){
          let resp = {
            colegio: '',
            rut: '',
            nombre: '',
            id_licencia: '',
            dias: 0,
            fecha_inicio: '',
            fecha_termino: '',
          } ;

          resp.colegio = element[3];
          resp.rut = element[2];
          resp.nombre= element[1];
          resp.id_licencia= element[4];
          resp.dias= element[7];
          dateformated = element[5].split("/")[1]+ '/' + element[5].split("/")[0] +'/' + element[5].split("/")[2];
          resp.fecha_inicio= dateformated;
          resp.fecha_termino= dateformated = element[6].split("/")[1]+ '/' + element[6].split("/")[0] +'/' + element[6].split("/")[2];
          temp.push(resp);
          console.log(temp);
          upLicencia(resp);
        }
    });
    return res.json(temp);
  });
  app.get('/api/admin/licencias/convert2', (req, res) => {
    let options = [{
      sheet:'1',
      isColOriented: false,
      omitEmtpyFields: false,
    }];



    //console.log("entre a la api convert");
    let dir_xls = './server/uploads/files/softland2/Softland2.xls';
    let dir_xlsx = './server/uploads/files/softland2/Softland2.xlsx';

    let src;

    if (fs.existsSync(dir_xls))
    {
      src = dir_xls;
    }
    else if (fs.existsSync(dir_xlsx))
    {
      src = dir_xlsx;
    }
    else{
      return res.send({
        success: false,
        message: 'Error, no existe archivo para convertir'
      })
    }

    let dst = [];
    let result = [];
    result = convertExcel.readFile(src, {type:'buffer', cellDates:true, cellText:false});
    let sheet = result.SheetNames[0];
    sheet = result.Sheets[sheet];
    result = convertExcel.utils.sheet_to_json(sheet,{header:1, dateNF:"DD-MM-YYYY"});


    let temp=[];
    let fecha =result[1][0].split(": ")[1];
    let mes = fecha.split(' ')[0];
    let ano = fecha.split(' ')[1];
    let col;

   // console.log(centCosto[0]['7']);

    result.forEach(function(element){

      if(element.length > 0 && element[1] !== "RUT")

        //console.log('entre');
        if(element.length === 12){
          let resp = {
            colegio: '',
            rut: '',
            nombre: '',
            dias_pago: 0,
            dias_total: 0,
            mes_pago: '',
            ano_pago: '',
            sis_salud: '',
            pago_fodec: 0,
            recuperado: 0,
            perdida: 0,
          } ;

          //console.log(Number(element[4]) === 0);
          if (parseInt(element[9]) > 0)
          {

            if(element[0][0] === '0')
            {
              col = element[0][1];
            }
            else {
              col = element[0][0] + element[0][1];
            }

            resp.colegio = centCosto[0][col];

            resp.rut = element[1];
            resp.nombre= element[2];
            resp.dias_total= Number(element[3]);
            resp.mes_pago= mes.toUpperCase();
            resp.ano_pago= ano;
            if (element[7] === ' '){
              resp.sis_salud= 'Fonasa';
            }
            else{
              resp.sis_salud= element[7];
            }
            resp.dias_pago= Number(element[9]);

            if (element[10] === '0'){
              resp.pago_fodec= Number(element[11]);
            }
            else{
              resp.pago_fodec= Number(element[10]);
            }
            temp.push(resp);
            //console.log(resp);
           // return res.json(temp);
            upResumen(resp);
          }
        }
    });
    return res.json(temp);
  });
  app.get('/api/admin/licencias/convert3', (req, res) => {

    let options = [{
      sheet:'1',
      isColOriented: false,
      omitEmtpyFields: false,
    }];

    //console.log("entre a la api convert");
    let dir_xls = './server/uploads/files/fonasa/fonasa.xls';
    let dir_xlsx = './server/uploads/files/fonasa/fonasa.xlsx';

    let src;

    if (fs.existsSync(dir_xls))
    {
      src = dir_xls;
    }
    else if (fs.existsSync(dir_xlsx))
    {
      src = dir_xlsx;
    }
    else{
      return res.send({
        success: false,
        message: 'Error, no existe archivo para convertir'
      })
    }

    result = convertExcel.readFile(src, {type:'buffer', cellDates:true, cellText:false});
    let sheet = result.SheetNames[0];
    sheet = result.Sheets[sheet];
    result = convertExcel.utils.sheet_to_json(sheet,{header:1, dateNF:"DD-MM-YYYY"});

    let fecha =result[1][22];
    let mes = meses[parseInt(fecha.split('/')[0]) - 1];
    let ano = "20" + fecha.split('/')[2];

    let rut;

    result.forEach(function(element){

      if (element [0] !== 'RUT EMPRESA')
      {

        rut = element[5]; //+ "-" + element[6];
        while (rut.length < 9) {
          rut = "0" + rut;
        }
        rut = rut.slice(0,3) + "." + rut.slice(3,6) + "." + rut.slice(6,10) + "-" + element[6];

          let resumen = buscaRut(rut, element, mes, ano);


        /*Licencia.findOne({id_licencia: element[8]}, function (err, doc) {
          doc.pago_licencia = parseInt(element[13]);
          doc.save();
          console.log('recuperado ingresado en licencias' + element[13]);
        });*/


      }

    });

    return res.send({
      success: true,
      message: 'recuperados ingresados '
    })
  });


  app.post('/api/admin/licencias/upload1', (req, res) => {
    let form = new multiparty.Form({ uploadDir: './server/uploads/files/softland1/' });
    let filename;
    let extension;
    let temp;
    let dir = './server/uploads/files/softland1/';
    form.parse(req, function(err, fields, files) {
      files['filepond'].forEach(function (file) {//Por cada elemento en data, desde ahora licencia

        console.log(file.path);//Imprimo la propiedad perdida de licencia
        temp = file.path.split('\\')[4];
        filename = temp.split('.')[0];
        extension = temp.split('.')[1];
        fs.rename( dir + filename + '.' + extension,dir + "Softland1." + extension, function (err) {
          if (err)
          {
            //console.log('rename callback', err);
          }
          else {
            console.log('rename good');
          }
          if (extension === 'xls' && fs.existsSync(dir + "Softland1." + 'xlsx'))
          {
            fs.unlink(dir + "Softland1." + 'xlsx', function (err) {

              if (err)
              {
                console.log('Problema al borrar el archivo')
              }
              else {
                console.log('Borrado con exito softland1.xlsx')
              }

            });
          }
          if (extension === 'xlsx' && fs.existsSync(dir + "Softland1." + 'xls'))
          {
            fs.unlink(dir + "Softland1." + 'xls', function (err) {

              if (err)
              {
                console.log('Problema al borrar el archivo')
              }
              else {
                console.log('Borrado con exito softland1.xls')
              }

            });
          }
        });
        upConvert();
      });

      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });


  });
  app.post('/api/admin/licencias/upload2', (req, res) => {
    let form = new multiparty.Form({ uploadDir: './server/uploads/files/softland2/' });
    let filename;
    let extension;
    let temp;
    let dir = './server/uploads/files/softland2/';
    form.parse(req, function(err, fields, files) {
      files['filepond'].forEach(function (file) {//Por cada elemento en data, desde ahora licencia

        console.log(file.path);//Imprimo la propiedad perdida de licencia
        temp = file.path.split('\\')[4];
        filename = temp.split('.')[0];
        extension = temp.split('.')[1];
        fs.rename( dir + filename + '.' + extension,dir + "Softland2." + extension, function (err) {
          if (err)
          {
            //console.log('rename callback', err);
          }
          else {
            console.log('rename good');
          }
          if (extension === 'xls' && fs.existsSync(dir + "Softland2." + 'xlsx'))
          {
            fs.unlink(dir + "Softland2." + 'xlsx', function (err) {

              if (err)
              {
                console.log('Problema al borrar el archivo')
              }
              else {
                console.log('Borrado con exito softland2.xlsx')
              }

            });
          }
          if (extension === 'xlsx' && fs.existsSync(dir + "Softland2." + 'xls'))
          {
            fs.unlink(dir + "Softland2." + 'xls', function (err) {

              if (err)
              {
                console.log('Problema al borrar el archivo')
              }
              else {
                console.log('Borrado con exito softland2.xls')
              }

            });
          }
        });
        upConvert2();
      });

      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });


  });
  app.post('/api/admin/licencias/upload3', (req, res) => {
    let form = new multiparty.Form({ uploadDir: './server/uploads/files/fonasa/' });
    let filename;
    let extension;
    let temp;
    let dir = './server/uploads/files/fonasa/';
    form.parse(req, function(err, fields, files) {
      files['filepond'].forEach(function (file) {//Por cada elemento en data, desde ahora licencia

        console.log(file.path);//Imprimo la propiedad perdida de licencia
        temp = file.path.split('\\')[4];
        filename = temp.split('.')[0];
        extension = temp.split('.')[1];
        fs.rename( dir + filename + '.' + extension,dir + "fonasa." + extension, function (err) {
          if (err)
          {
            //console.log('rename callback', err);
          }
          else {
            console.log('rename good');
          }
          if (extension === 'xls' && fs.existsSync(dir + "fonasa." + 'xlsx'))
          {
            fs.unlink(dir + "fonasa." + 'xlsx', function (err) {

              if (err)
              {
                console.log('Problema al borrar el archivo')
              }
              else {
                console.log('Borrado con exito softland2.xlsx')
              }

            });
          }
          if (extension === 'xlsx' && fs.existsSync(dir + "fonasa." + 'xls'))
          {
            fs.unlink(dir + "fonasa." + 'xls', function (err) {

              if (err)
              {
                console.log('Problema al borrar el archivo')
              }
              else {
                console.log('Borrado con exito fonasa.xls')
              }

            });
          }
        });
        upConvert3();
      });

      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });


  });

};
