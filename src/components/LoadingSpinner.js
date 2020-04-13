import React from 'react';
import {
  Modal,
  ModalBody,
} from "reactstrap";

const LoadingSpinner = ({visible}) => (
  <Modal isOpen={visible} fade={false} style={{
    width: '300px',
    height: '300px',
    textAlign: 'center',
    color: '#ddd'
  }}>
    <ModalBody style={{
      backgroundColor: '#1e1e2f', width: '100%',
      height: '100%',
      fontSize: '20px'
    }}>
      <i className="fa fa-spinner fa-spin" /> Loading
    </ModalBody>
  </Modal>

);

export default LoadingSpinner;