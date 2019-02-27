const Licencia = require('../../models/Licencias');
const Resumen = require('../../models/Resumen');
let convertExcel = require('js-xlsx');
const fetch = require('node-fetch');
let fs = require('fs');
var util = require('util');
let multiparty = require('multiparty');



function upLicencia(converted) {

  //sacar state
  //post request al backend

  fetch('http://localhost:8080/api/admin/licencias/post', {
    method: 'post',
    body: JSON.stringify(converted),
    headers: {'Content-Type' : 'application/json'},
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}

function upResumen(converted) {

  //sacar state
  //post request al backend

  fetch('http://localhost:8080/api/admin/licencias/post2', {
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
  fetch('http://localhost:8080/api/admin/licencias/convert', {
    method: 'get',
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}
function upConvert2() {

  //sacar state
  //post request al backend
  fetch('http://localhost:8080/api/admin/licencias/convert2', {
    method: 'get',
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
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
                    console.log(err);
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
                          console.log(err);
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
                  console.log(err);
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
            console.log(err);
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
  app.get('/api/admin/licencias/convert', (req, res) => {
    let options = [{
      sheet:'1',
      isColOriented: false,
      omitEmtpyFields: false,
    }];


    //console.log("entre a la api convert");
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

    let dst = [];
    let result = [];
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

};
