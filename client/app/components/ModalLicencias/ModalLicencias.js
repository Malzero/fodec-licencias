import React from 'react';
import ReactTable from 'react-table';
import Modal from 'react-bootstrap/es/Modal';
import Button from "react-bootstrap/es/Button";
import {setInStorage} from "../../utils/storage";
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import './custom.css'


class ModalLicencias extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      licencias: [],
      original: props.original,
      inde: props.index,
      todo: props.todo,

    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getTabla = this.getTabla.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  componentDidMount(){
    this.getTabla();
  }

  getTabla() {

    let rut = '';
   /* let temp = this.state.todo;
   //console.log(temp);
    temp.forEach(function (element) {
      console.log(this.state.inde );
      if(this.state.inde === element.index)
      {
        rut = element.rut;

      }
    });
*/
    //post request al backend
    fetch('/api/admin/licencias/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        rut: rut,
      }),
    }).then(res => res.json())
      .then(res => this.setState({licencias: res}))
      .catch(error => console.log("parsing fail", error));
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {


    const columns =
      [
        {
          Header: 'ID Licencia',
          accessor: 'id_licencia' // String-based value accessors!
        },
        {
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
          Header: 'Días',
          accessor: 'dias' // String-based value accessors!
        },
        {
          Header: 'Fecha Inicio',
          accessor: 'fecha_inicio' // String-based value accessors!
        },
        {
          Header: 'Fecha Término',
          accessor: 'fecha_termino' // String-based value accessors!
        },
        {
          Header: 'Opciones',
          //Cell: props => <ModalLicencias/>
        },
      ];

    let close = () => this.setState({ show: false });
    return (
      <ButtonToolbar>
        <Button onClick={() =>
          this.setState({ show: true })


        }>
          Ver Licencias
        </Button>

          <Modal
            dialogClassName="my-modal"
            size = "lg"
            show={this.state.show}
            onHide={close}//{this.handleClose}
            aria-labelledby="titulo"
          >

            <Modal.Header closeButton>
              <Modal.Title id="titulo">Licencias por persona en el mes</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ReactTable
                  data={this.state.licencias}//{data}
                  pageSize={this.state.licencias.length}
                  columns={columns}
                  filterable
                />

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
      </ButtonToolbar>
    );
  }
}
export default ModalLicencias;
