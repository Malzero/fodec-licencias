import React, {Component} from 'react';
import ReactTable from 'react-table';
//import 'whatwg-fetch';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      licencias: [],
      tabla: {},
    };
    this.getTabla = this.getTabla.bind(this);
  }

  getTabla() {
    fetch('/api/admin/licencias/get')
      .then((resp) => resp.json())
      .then(function (myJson) {
        console.log(myJson);
        return myJson;
      });
   // console.log(resp.clone());
  }

  render() {
    const data = this.getTabla()[0];
    console.log(data);
    const columns = [{
      Header: 'id_licencia',
      accessor: 'id_licencia' // String-based value accessors!
    },
      {
        Header: 'rut',
        accessor: 'rut' // String-based value accessors!
      },
      {
        Header: 'nombre',
        accessor: 'nombre' // String-based value accessors!
      },
      {
        Header: 'colegio',
        accessor: 'colegio' // String-based value accessors!
      },
      {
        Header: 'dias',
        accessor: 'dias' // String-based value accessors!
      },
      {
        Header: 'fecha inicio',
        accessor: 'fecha_inicio' // String-based value accessors!
      },
      {
        Header: 'fecha termino',
        accessor: 'fecha_termino' // String-based value accessors!
      },
      {
        Header: 'dias pago',
        accessor: 'dias_pago' // String-based value accessors!
      },
      {
        Header: 'mes pago',
        accessor: 'mes_pago' // String-based value accessors!
      },
      {
        Header: 'sis salud',
        accessor: 'sis_salud' // String-based value accessors!
      },
      {
        Header: 'pago fodec',
        accessor: 'pago_fodec' // String-based value accessors!
      },
      {
        Header: 'estado',
        accessor: 'estado' // String-based value accessors!
      },
      {
        Header: 'recuperado',
        accessor: 'recuperado' // String-based value accessors!
      },
      {
        Header: 'perdida',
        accessor: 'perdida' // String-based value accessors!
      },
    ];
    return (
      <div>
        <ReactTable
        data={data}
        columns={columns}
        filterable
        />

      </div>
    );
  }




}
export default Dashboard;
