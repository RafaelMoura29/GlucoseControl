import React from 'react';
import {
  Modal,
  ModalBody,
  CardText,
  Row,
  Col
} from "reactstrap";

const ModalMessager = ({ children, visible, text, textSecondary }) => (
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
      {textSecondary &&
        <blockquote className="blockquote text-center">
          <p className="mb-0" style={{ color: '#ddd', fontSize: 13 }}>{textSecondary}</p>
        </blockquote>
      }
    </ModalBody>
  </Modal>

);

export default ModalMessager;