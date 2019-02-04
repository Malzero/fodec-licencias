import React from 'react';
var estaLogueado=0;
import Redirect from "react-router/es/Redirect";
const verificarRuta = (Component) => {
  return (estaLogueado)
    ? <Component/>
    : <Redirect to="/"/>
};

export default verificarRuta;
