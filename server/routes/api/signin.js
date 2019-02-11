const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  //Sign up
  app.post('/api/account/signin', (req, res, next) => {
    const {body} = req;
    const {
      user,
      password,
    } = body;

    if (!user){
      return res.send({
        success: false,
        message: 'Error, usuario no puede estar vacío'
      })
    }
    if (!password){
      return res.send({
        success: false,
        message: 'Error, password no puede estar vacío'
      })
    }

    User.find({
      user: user,
    }, (err, users) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error en el servidor'
        });
      }
      if(users.length!== 1) {
        return res.send({
          success: false,
          message: "Nombre de usuario no válido"
        });
      }

      const user = users[0];

      if(!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error, contraseña no válida'
        })
      }
      //Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err){
          return res.send({
            success: false,
            message: 'Error, campo no puede estar en vacío'
          });
        }
        return res.send({
          success: true,
          message: 'Valid session',
          token: doc._id
        })
      });
    });

  });
  app.get('/api/account/verify', (req, res, next) => {
    //get token

    const {query} = req;
    const {token} = query;
    //token = test
    //verificar si el token es de un tipo y si no esta eliminado

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error del servidor'
        });
      }

      if (session.length !== 1){
          return res.send({
          success: false,
          message: 'Error, invalido'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });
  app.post('/api/account/signup', (req, res, next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      user,
      role,
      password,
    } = body;
    let {
      email
    } = body;
    if (!firstName){
      return res.send({
        success: false,
        message: 'Error, campo no puede estar en vacío'
      })
    }
    if (!lastName){
      return res.send({
        success: false,
        message: 'Error, campo no puede estar en vacío'
      })
    }
    if (!user){
      return res.send({
        success: false,
        message: 'Error, campo no puede estar en vacío'
      })
    }
    if (!email){
      return res.send({
        success: false,
        message: 'Error, campo no puede estar en vacío'
      })
    }
    if (!role){
      return res.send({
        success: false,
        message: 'Error, campo no puede estar en vacío'
      })
    }
    if (!firstName){
      return res.send({
        success: false,
        message: 'Error, campo no puede estar en vacío'
      })
    }
    if (!password){
      return res.send({
        success: false,
        message: 'Error, campo no puede estar en vacío'
      })
    }

    console.log('here');
    email = email.toLowerCase();
    //email = email.trim ();
    //Pasos
    //1 verificar correo no existente
    //2 guardar

    User.find({
      user: user

    }, (err, previousUsers) => {
      if (err){
        return res.send('Error: Server error');
      } else if (previousUsers.length > 0) {
        return res.send('Error: la cuenta ya existe');
      }

      //save user
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.user = user;
      newUser.role = role;
      newUser.save((err, user) => {
        if(err){
          return res.send({
            success: false,
            message: 'Error de servidor'
          });
        }
        return res.send({
          success: true,
          message: 'Registrado'
        })
      })
    });
  });
  app.get('/api/account/logout' , (req, res, next) => {
    //get token

    const {query} = req;
    const {token} = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
    $set:{
      isDeleted:true
    }
    }, null, (err, sessions) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error del servidor'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });
  app.get('/api/account/info')
};
