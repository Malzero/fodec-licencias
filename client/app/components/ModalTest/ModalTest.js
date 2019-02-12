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
      files: []
    };
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
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <p>
            Subir Archivo SOFTLAND 1
          </p>
          <FilePond
           // ref={ref => this.pond = ref}
            files={this.state.files}
            server="/api/admin/licencias/upload"
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
              Subir Archivo SOFTLAND 2
            </p>
            <FilePond/>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalTest;
//render(<ModalTest />);
