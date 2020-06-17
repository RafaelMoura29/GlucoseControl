import React from 'react'

import { Button, Input, Label, Container } from "reactstrap";

import { Link } from "react-router-dom";

const RecoverPassword = () => (
    <>
    <Container className="themed-container" fluid={true} >
      <p style={{ color: '#ddd', textAlign: 'justify', fontSize: '1.2em' }}>
        Utilize o e-mail cadastrado para recuperar a senha.
      </p>
    </Container>

    <Container className="themed-container" fluid={true} style={{ marginTop: 35 }} >

      <Label style={{ color: '#ddd', marginBottom: 25, fontSize: 22 }}>
        RESGATAR SENHA
      </Label>

      <Input type="email" placeholder="E-mail" style={{ marginBottom: 25 }} />

    </Container>

    <Container className="themed-container" fluid={true} style={{ marginBottom: 25 }} >
      <Button id="btn-login" color="primary">
        ENVIAR EMAIL
      </Button>
    </Container>

    <Container className="themed-container text-center" fluid={true} style={{ marginBottom: 10 }} >
      <Link to="/authentication/register" className="secondary-link">Ainda não tenho uma conta</Link>
    </Container>

    <Container className="themed-container text-center" fluid={true}>
      <Link to="/authentication/login" className="secondary-link">Fazer login</Link>
    </Container>
    </>
)

export default RecoverPassword