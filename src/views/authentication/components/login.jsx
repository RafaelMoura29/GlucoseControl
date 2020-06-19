import React from 'react'
import { Button, Input, Label, Container } from "reactstrap";
import { Link } from "react-router-dom";

const Login = ({ emailLogin, senhaLogin, handleChange, handleLogin }) => (
  <>
    <Container className="themed-container" fluid={true} >
      <p style={{ color: '#ddd', textAlign: 'justify', fontSize: '1.2em' }}>
        Caso já seja nosso parceiro e tenha um plano de assinatura, basta acessar com seu e-mail e senha.
      </p>
    </Container>
    <form onSubmit={handleLogin} action="POST">
      <Container className="themed-container" fluid={true} style={{ marginTop: 35 }} >

        <Label style={{ color: '#ddd', marginBottom: 25, fontSize: 22 }}>
          LOGIN
        </Label>

        <Input
          required
          type="email"
          placeholder="E-mail"
          name="emailLogin"
          value={emailLogin}
          onChange={handleChange}
          style={{ marginBottom: 25 }}
        />

        <Input
          minLength={8}
          required
          type="password"
          placeholder="Senha"
          name="senhaLogin"
          value={senhaLogin}
          onChange={handleChange}
          style={{ marginBottom: 25 }}
        />

      </Container>

      <Container className="themed-container" fluid={true} style={{ marginBottom: 25 }} >
        <Button id="btn-login"  type="submit" color="primary" >
          LOGIN
        </Button>
      </Container>
    </form>


    <Container className="themed-container text-center" fluid={true} style={{ marginBottom: 10 }} >
      <Link to="/authentication/register" className="secondary-link">Ainda não tenho uma conta</Link>
    </Container>

    <Container className="themed-container text-center" fluid={true}>
      <Link to="/authentication/recoverPassword" className="secondary-link">Esqueci minha senha</Link>
    </Container>
  </>
)

export default Login