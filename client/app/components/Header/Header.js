import React from 'react';
import fodec from './fodec_tn.jpg';
import {Navbar} from 'react-bootstrap';
import MenuItem from "react-bootstrap/es/MenuItem";
import NavItem from "react-bootstrap/es/NavItem";
import Nav from "react-bootstrap/es/Nav";
import NavDropdown from "react-bootstrap/es/NavDropdown";
import Image from "react-bootstrap/es/Image";
//<img src={fodec} />
const Header = () => (
  <Navbar inverse collapseOnSelect>
    <Nav pullLeft>
      <NavItem>
        <Image src={fodec} rounded responsive/>
      </NavItem>
    </Nav>
    <Navbar.Header>
      <Navbar.Brand>

        <a>Control de Licencias FODEC</a>

      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>

      <Nav pullLeft bsStyle="large">
        <NavItem eventKey={1} href="#">
          Generar Reporte
        </NavItem>
        <NavItem eventKey={2} href="/graficos">
          Generar gráfico
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={3} href="/">
          Cerrar sesión
        </NavItem>
      </Nav>
    </Navbar.Collapse>

  </Navbar>
);

export default Header;
