import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { modalActionClose, modalActionConfirm } from "actions/constant";

function ConfirmModal(props) {
  const { title, content, onAction, show } = props;
  return (
    // <div className="confirmModal">
      <Modal show={show} onHide={() => onAction(modalActionClose)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onAction(modalActionClose)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onAction(modalActionConfirm)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    // </div>
  );
}

export default ConfirmModal;
