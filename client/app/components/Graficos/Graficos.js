import React, {Component} from 'react';
import ReactTable from 'react-table';
import Converter from '../Converter/Converter';
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import ModalTest from '../ModalTest/ModalTest'


//import {BarChart} from 'react-easy-chart';
import BarraDiferencia from "./BarraDiferencia";
import ModalLicencias from "../ModalLicencias/ModalLicencias";


class Graficos extends Component {

  constructor() {
    super();

    this.state = {
      resumenes: [],
      data: [],
      temp: [],

    };

    this.renderEditable = this.renderEditable.bind(this);

  }
  componentDidMount(){

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

    return (

      <div>
        <ButtonToolbar>
          <BarraDiferencia />
        </ButtonToolbar>
        <br/>
      </div>
    );
  }

}
export default Graficos;
