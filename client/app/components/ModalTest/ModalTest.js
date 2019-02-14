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
      files: [],
      files2: []
    };
  }

  handleClose() {
    this.setState({ show: false });
    window.location.reload();
  }
  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Importar Archivos Softland
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Subir archivos Softland</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <p>
            Archivo SOFTLAND 1
          </p>
          <FilePond
           // ref={ref => this.pond = ref}
            files={this.state.files}
            server="http://localhost:8080/api/admin/licencias/upload1"
            oninit={() => this.handleInit() }
            onupdatefiles={fileItems => {
              // Set currently active file objects to this.state
              this.setState({
                files: fileItems.map(fileItem => fileItem.file)
              });
            }}>
          </FilePond>

        </Modal.Body>
          <Modal.Body>

            <p>
              Archivo SOFTLAND 2
            </p>
            <FilePond
              // ref={ref => this.pond = ref}
              files={this.state.files2}
              labelIdle="Arrastre y suelte el archivo Softland aca o busque desde el explorador haciendo <span> Click </span>"
              server="http://localhost:8080/api/admin/licencias/upload2"
              oninit={() => this.handleInit() }
              onupdatefiles={fileItems => {
                // Set currently active file objects to this.state
                this.setState({
                  files2: fileItems.map(fileItem => fileItem.file)
                });
              }}>
            </FilePond>

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
