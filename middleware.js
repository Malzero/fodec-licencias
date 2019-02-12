const jwt = require ('jsonwebtoken');
const secret = 'mysecretsshhh';
const withAuth = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers ['x-access-token'] ||
    req.cookies.token;
  if (! token) {
    res.status (401) .send ('No autorizado: No se proporcionó el token');
  } else {
    jwt.verify (token, secret, function (err, decoded) {
      if (err) {
        res.status (401) .send ('No autorizado: token no válido');
      } else {
        req.email = decoded.email ;
        siguiente ();
      }
    });
  }
};
module.exports = withAuth;
