import React, {Component} from 'react';
import ReactTable from 'react-table';
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import ModalTest from '../ModalTest/ModalTest'
import ModalLicencias from '../ModalLicencias/ModalLicencias'
import Header from "../Header/Header";



class Dashboard extends Component {

  constructor() {
    super();

    this.state = {
      licencias: [],
      resumenes: [],
      indexRut:[],

      data: [],
      temp: [],
    };

    this.getTabla2 = this.getTabla2.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.getUpdate = this.getUpdate.bind(this);
  }

  componentDidMount() {
    this.getTabla2();
    this.getUpdate();
  }


  getTabla2() {
    fetch('/api/admin/licencias/get2')
      .then(results => results.json())
      .then(results => this.setState({resumenes: results}))
      .catch(error => console.log("parsing fail", error))
  }

  getUpdate() {
    fetch('/api/admin/licencias/update_per')
      .then(results => results.json())
      .catch(error => console.log("error update", error))
  }



  renderEditable(cellInfo) {
    return (
      <div
        style={{backgroundColor: "#fafafa"}}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({data});
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {

    const data = this.state.licencias;


    const columns =
      [{
        Header: 'Colegio',
        accessor: 'colegio' // String-based value accessors!
      },
        {
          Header: 'Rut',
          accessor: 'rut' // String-based value accessors!
        },
        {
          Header: 'Nombre',
          accessor: 'nombre' // String-based value accessors!
        },
        {
          Header: 'Días Pago',
          accessor: 'dias_pago' // String-based value accessors!
        },
        {
          Header: 'Días Totales',
          accessor: 'dias_total' // String-based value accessors!
        },
        {
          Header: 'Mes Pago',
          accessor: 'mes_pago' // String-based value accessors!
        },
        {
          Header: 'Sistema Salud',
          accessor: 'sis_salud' // String-based value accessors!
        },
        {
          Header: 'Pago FODEC',
          accessor: 'pago_fodec' // String-based value accessors!
        },
        {
          Header: 'Estado',
          accessor: 'estado' // String-based value accessors!
        },
        {
          Header: 'Recuperado',
          accessor: 'recuperado' // String-based value accessors!
        },
        {
          Header: 'Pérdida',
          accessor: 'perdida' // String-based value accessors!
        },
        {
          Header: 'Opciones',
          accessor: 'rut',
          Cell: row => <ModalLicencias
            index={row.index}

            indexRut = {this.state.indexRut.push(
            {
              'index': row.index,
              'rut': row.original.rut,
            }
          )}

            todo = {this.state.indexRut}
          />,
        }];


    return (

      <div>
        <ButtonToolbar>
          <ModalTest/>
        </ButtonToolbar>
        <br/>
        <ReactTable
          data={this.state.resumenes}//{data}
          pageSize={this.state.resumenes.length}
          columns={columns}
          filterable
        />
      </div>
    );
  }
}

export default Dashboard;
