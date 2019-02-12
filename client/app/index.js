import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import GestionCuentas from './components/GestionCuentas/GestionCuentas'
import Home from './components/Home/Home';
import verificarRuta from './components/verificarRuta/verificarRuta'
import Dashboard from './components/Dashboard/Dashboard'
import VistaDirector from './components/VistaDirector/VistaDirector'
import HelloWorld from './components/HelloWorld/HelloWorld';

import Graficos from './components/Graficos/Graficos';

import './styles/styles.scss';
import 'filepond/dist/filepond.min.css';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/dashboard" render={() => verificarRuta(Dashboard)}/>
        <Route path="/certificados" render={() => verificarRuta(VistaDirector)}/>
        <Route path="/gestioncuentas" render={() => verificarRuta(GestionCuentas)}/>
        <Route path="/helloworld" render={() => verificarRuta(HelloWorld)}/>
        <Route path="/graficos" render={() => verificarRuta(Graficos)}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
