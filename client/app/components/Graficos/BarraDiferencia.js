import React, {Component} from 'react';
import { Legend, Bar,BarChart,CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import Footer from "../Footer/Footer";

class BarraDiferencia extends Component {

  constructor() {
    super();
    this.state = {
      resumenes: [],
      data: [],
      temp: [],
      perdidas: [],
    };
    this.getTabla = this.getTabla.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.getPerdida = this.getPerdida.bind(this);

  }
  componentDidMount(){
    this.getTabla();
  }

  getTabla() {
    fetch('/api/admin/licencias/get2')
      .then(results => results.json())
      .then(results => this.setState({resumenes: results}))//this.setState({licencias: results}))
      .catch(error => console.log("parsing fail", error))
  }


  getPerdida(resumenes){
    let temp = [];
    let boo;
    resumenes.forEach(function (resumen) {
      boo = false;
      temp.forEach(function (element) {

        if (element.name === resumen.sis_salud)
        {
          boo = true;
          element["Pérdida FODEC"] += resumen.perdida;
          element["Devolución Isapre"] += resumen.recuperado;
        }
      });
      if (!boo)
      {
        temp.push({
          "name": resumen.sis_salud,
          "Devolución Isapre": resumen.recuperado,
          "Pérdida FODEC": resumen.perdida,
          "atm": resumen.perdida
        })
      }
    });
    return temp;
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

    const data = this.state.resumenes;
    const data2 = this.getPerdida(data);

    //SACAR DATOS DE LICENCIA
data2.forEach(function (licencia) {//Por cada elemento en data, desde ahora licencia

  console.log(licencia);//Imprimo la propiedad perdida de licencia
});
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
      </div>
    );
  }
}
export default BarraDiferencia;
