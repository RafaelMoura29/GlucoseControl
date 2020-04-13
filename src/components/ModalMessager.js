import React from 'react';
import {
  Modal,
  ModalBody,
  CardText,
  ModalHeader
} from "reactstrap";

const ModalMessager = ({children, visible, text, toggle}) => (
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
    {children}
      <CardText style={{ color: '#ddd' }}>
        {text}
      </CardText>
    </ModalBody>
  </Modal>

);

export default ModalMessager;