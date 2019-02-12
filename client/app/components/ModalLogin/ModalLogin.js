import React from 'react';
import Modal from 'react-bootstrap/es/Modal';
import Button from "react-bootstrap/es/Button";

class ModalLogin extends React.Component {
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
         {this.handleShow}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Carga licencias Excel</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>

        </Modal>
      </>
    );
  }
}
export default ModalLogin;
