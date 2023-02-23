import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import './Error.css';

export const ErrorModal = (props: {message: string}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
      <Modal show={show} onHide={handleClose} className="error-modal">
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button data-testid="error-close" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
