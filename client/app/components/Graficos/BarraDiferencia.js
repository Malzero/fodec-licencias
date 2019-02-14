import React, {Component} from 'react';
import ReactTable from 'react-table';
import Converter from '../Converter/Converter';
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import ModalTest from '../ModalTest/ModalTest'


import { Legend, Bar,BarChart,LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import Footer from "../Footer/Footer";




class BarraDiferencia extends Component {

  constructor() {
    super();

    this.state = {
      licencias: [],
      data: [],
      temp: [],
    };
    this.getTabla = this.getTabla.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
  }
  componentDidMount(){
    this.getTabla();
  }

  getTabla() {
    fetch('/api/admin/licencias/get')
      .then(results => results.json())
      .then(results => this.setState({licencias: results}))//this.setState({licencias: results}))
      .catch(error => console.log("parsing fail", error))
  }









  renderEditable(cellInfo) {

    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {
    let temp = [];

    //console.log(JSON.parse(JSON.stringify(this.state.licencias))[0]);
    temp.push(JSON.parse(JSON.stringify(this.state.licencias))[0]);
    temp.push(JSON.parse(JSON.stringify(this.state.licencias))[1]);
    if (this.state.licencias.length > 1){
      console.log(this.state.licencias);
    }

    // this.state.data.push(this.state.licencias[0]);
    //temp.push(JSON.parse(JSON.stringify(this.state.licencias[1]))) ;
    //console.log(temp);
    const data = this.state.licencias;


console.log(data[0]);


    const data2 = [
      {
        "name": "Cruz Blanca",
        "Devolución Isapre": 1234,
        "Pérdida FODEC": 2400,
        "amt": 2400
      },
      {
        "name": "Banmédica",
        "Devolución Isapre": 3000,
        "Pérdida FODEC": 1398,
        "amt": 2210
      },
      {
        "name": "Consalud",
        "Devolución Isapre": 2000,
        "Pérdida FODEC": 9800,
        "amt": 2290
      },
      {
        "name": "Masvida",
        "Devolución Isapre": 2780,
        "Pérdida FODEC": 3908,
        "amt": 2000
      },
      {
        "name": "Colmena",
        "Devolución Isapre": 1890,
        "Pérdida FODEC": 4800,
        "amt": 2181
      },
      {
        "name": "Vidatres",
        "Devolución Isapre": 2390,
        "Pérdida FODEC": 3800,
        "amt": 2500
      },
      {
        "name": "Fonasa",
        "Devolución Isapre": 3490,
        "Pérdida FODEC": 4300,
        "amt": 2100
      }
    ];


    return (

      <div align="center">
        <h4>Devolución isapres vs pago FODEC</h4>

        <BarChart width={730} height={250} data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Devolución Isapre" fill="green" />
          <Bar dataKey="Pérdida FODEC" fill="#82ca9d" />
        </BarChart>


        <br/>

      <Footer/>
      </div>
    );
  }

}
export default BarraDiferencia;
