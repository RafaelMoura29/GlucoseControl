import React from 'react'
import { Button, Input, Label, Container } from "reactstrap";
import { Link } from "react-router-dom";

const Login = ({ emailLogin, senhaLogin, handleChange, handleLogin, isLoggingIn, errorMessage }) => (
  <>
    <Container className="themed-container" fluid={true} >
      <p style={{ color: '#ddd', textAlign: 'justify', fontSize: '1.2em' }}>
        Caso ainda não tenha permissão para uso do Glycon em sua UTI, faça a solicitação clicando no botão acima!
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
          
        />
        <p className="mt-2" style={{ marginBottom: 20, color:"#fd5d93" }}>{errorMessage}</p>

      </Container>

      <Container className="themed-container" fluid={true} style={{ marginBottom: 25 }} >
        <Button id="btn-login"  type="submit" color="info" disabled={isLoggingIn}>
          { isLoggingIn ? <><i className="fa fa-spinner fa-spin" /> Carregando </>  : <> LOGIN </> }
        </Button>
      </Container>
    </form>

    <Container className="themed-container text-center" fluid={true}>
      <Link to="/authentication/recoverPassword" className="secondary-link">Esqueci minha senha</Link>
    </Container>
  </>
)

export default Login