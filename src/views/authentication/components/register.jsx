import React from 'react'

import { Button, Input, Label, Container } from "reactstrap";

import { Link } from "react-router-dom";

const Register = () => (
    <>
    <Container className="themed-container" fluid={true} style={{ marginTop: 5 }} >

      <Label style={{ color: '#ddd', marginBottom: 25, fontSize: 22 }}>
        CADASTRO
      </Label>

      <Input type="email" placeholder="E-mail" style={{ marginBottom: 25 }} />

      <Input type="text" placeholder="Nome de usuário" style={{ marginBottom: 25 }} />

      <Input type="password" placeholder="Senha" style={{ marginBottom: 25 }} />

      <Input type="password" placeholder="Confirmar senha" style={{ marginBottom: 25 }} />

    </Container>

    <Container className="themed-container" fluid={true} style={{ marginBottom: 25 }} >
      <Button id="btn-login" color="primary">
        LOGIN
      </Button>
    </Container>

    <Container className="themed-container text-center" fluid={true} style={{ marginBottom: 10 }} >
      <Link to="/authentication/login" className="secondary-link">Já tenho uma conta</Link>
    </Container>

    <Container className="themed-container text-center" fluid={true}>
      <Link to="/authentication/recoverPassword" className="secondary-link">Esqueci minha senha</Link>
    </Container>
    </>
)

export default Register