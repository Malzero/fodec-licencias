import React from 'react';
var estaLogueado=1;
import Redirect from "react-router/es/Redirect";
import Header from "../Header/Header";
const verificarRuta = (Component) => {
  return (estaLogueado)
    ? <div><Header/><Component/></div>
    : <Redirect to="/"/>
};

export default verificarRuta;
