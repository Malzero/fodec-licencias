import React from 'react';
import Modal from 'react-bootstrap/es/Modal';
import Button from "react-bootstrap/es/Button";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.css';

class ModalTest extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Carga Licencias Excel
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Carga licencias Excel</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
            <p>
              Subir Archivo SOFTLAND parte 1
            </p>
              <FilePond
                files={this.state.files}
                allowMultiple={true}
                server='http://localhost:8080/api/admin/licencias/upload'

              />
            </div>
            <td/>
            <div>
            <p>
              Subir Archivo SOFTLAND parte 2
            </p>
            <FilePond/>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalTest;
//render(<ModalTest />);
