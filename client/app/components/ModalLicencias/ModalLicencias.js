import React from 'react';
import ReactTable from 'react-table';
import Modal from 'react-bootstrap/es/Modal';
import Button from "react-bootstrap/es/Button";
import {setInStorage} from "../../utils/storage";
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import './custom.css';
import verImage from '../../../public/assets/img/eye.png';
import editImage from '../../../public/assets/img/Pencil.png';


class ModalLicencias extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      licencias: [],
      original: props.original,
      inde: props.index,
      todo: props.todo,
      rut: props.rut,

    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getTabla = this.getTabla.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }



  getTabla() {
    //let rut = this.state.rut;
   //console.log(temp);
   /* temp.forEach(function (element) {
      console.log( inde);
      if(inde === element.index)
      {
        rut = element.rut;

      }
    });*/

    //post request al backend
    fetch('http://192.168.1.159:8080/api/admin/licencias/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        rut: this.state.rut,
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

  componentDidMount(){

  }

  handleClick(){
    this.setState({ show: true });
    this.getTabla();
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
        <Button onClick={(e) => this.handleClick(e)}>
          <div><img src={verImage} style={{width: 20, height: 20}}/></div>
        </Button>
        <Button onClick={(e) => this.handleClick(e)}>
          <div><img src={editImage} style={{width: 20, height: 20}}/></div>
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
