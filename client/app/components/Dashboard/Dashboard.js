import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';

class Dashboard extends Component {

  constructor() {
    super();

    this.state = {
      licencias: [],
      data: [],
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
      .then(results => this.setState({licencias: results}))
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
    const{licencias} = this.props;
    const columns =
      [{
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
        accessor: 'estado', // String-based value accessors!
        Cell: this.renderEditable
      },
      {
        Header: 'recuperado',
        accessor: 'recuperado' // String-based value accessors!
      },
      {
        Header: 'perdida',
        accessor: 'perdida' // String-based value accessors!
      },
        {
          Header: 'Opciones',
        },
    ];

    //console.log(JSON.stringify(this.state.licencias));
    let tabla;
    tabla = JSON.stringify(this.state.licencias);
    console.log("tabla");
    //console.log(tabla);
    if (this.state.licencias.length > 0)
    {
      console.log(this.state.licencias.length);
    }

    this.state.data.push(JSON.stringify(this.state.licencias[0]));
    console.log("data");
    console.log(this.state.data);
    return (
      <div>
          <h1>{}</h1>
          <ReactTable
            //data={tabla}//{data}

            columns={columns}
            filterable
          />

      </div>
    );
  }

}
export default Dashboard;
