import React from "react";
import './style.css'

import { Link } from "react-router-dom";
import { Row, Col, Button, Input, Label, Container } from "reactstrap";
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

        <Row style={{ margin: 0, padding: '25px 10px 17px 25px' }}>

          <Col md="8" style={{ height: '100%' }}>

          </Col>

          <Col md="4" style={{ height: '100%', flexGrow: 1, marginTop: 15 }}>

            <Container className="themed-container" fluid={true} >
              <p style={{ color: '#ddd', textAlign: 'justify', fontSize: '1.2em' }}>
                Caso já seja nosso parceiro e tenha um plano de assinatura, basta acessar com seu e-mail e senha.
              </p>
            </Container>

            <Container className="themed-container" fluid={true} style={{ marginTop: 35 }} >

              <Label style={{color: '#ddd', marginBottom: 25, fontSize: 22}}>
                LOGIN
              </Label>

              <Input type="text" placeholder="Usuário" style={{marginBottom: 25}} />

              <Input type="text" placeholder="Senha" style={{marginBottom: 25}} />

            </Container>

            <Container className="themed-container" fluid={true} style={{marginBottom: 25}} >
              <Button id="btn-login" color="primary">
                LOGIN
              </Button>
            </Container>

            <Container className="themed-container text-center" fluid={true} style={{marginBottom: 10}} >
              <Link to="#" className="secondary-link">Ainda não tenho uma conta</Link>
            </Container>

            <Container className="themed-container text-center" fluid={true}>
              <Link to="#" className="secondary-link">Esqueci minha senha</Link>
            </Container>
          </Col>
 
        </Row>
      </>
    );
  }
}

export default Login;
