import React from "react";
import './style.css'

import { Link } from "react-router-dom";
import { Row, Col, Button, Container } from "reactstrap";
import imgLogo from "../../assets/img/GLYCON-bco.png"

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.screen.width,
      screenHeigth: window.screen.height,
    }
  }

  render() {
    return (
      <>
        <Row id="row-navbar">

          <Col md="6">
            <img src={imgLogo} alt="" height="73" width="245" />
          </Col>

          <Col id="col-navbar-links" md="6">
            <Link style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }} to={'#'}>
              Sobre
            </Link>
            <Link style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }} to={'#'}>
              Contato
            </Link>
            <Link style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }} to={'#'}>
              Ajuda
            </Link>
            <Link style={{ marginRight: 12, marginLeft: 12 }} to={'#'}>
              <Button id="btn-assinar" color="primary">
                Assinar
              </Button>
            </Link>
          </Col>
          
        </Row>
      </>
    );
  }
}

export default Login;
