import React from 'react';
import {
  Modal,
  ModalBody,
  CardText,
} from "reactstrap";

import './style.css'

const ModalMessager = ({ children, visible, text, textSecondary }) => (
  <Modal isOpen={visible} id="modal" fade={false} >

    <ModalBody id="modalBody" >
      {children}
      <CardText id="cardText">
        {text}
      </CardText>
      {textSecondary &&
        <blockquote className="blockquote text-center">
          <p className="mb-0" id="cardTextSecondary">{textSecondary}</p>
        </blockquote>
      }
    </ModalBody>
  </Modal>
)

export default ModalMessager;