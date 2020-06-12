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
        <Row style={{ margin: 0, padding: '25px 10px 17px 25px' }}>
          <Col md="6">
          <img src={imgLogo} alt="" height="76" width="257" />

          </Col>
          <Col md="6" style={{textAlign: "right"}}>
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
              <Button color="primary" style={{ background: '#a564e9', fontWeight: 'unset' }}>
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
