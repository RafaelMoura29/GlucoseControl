import React from 'react'

import { Button, Input, Label, Container } from 'reactstrap'

import { Link } from 'react-router-dom'

const ChangePassword = ({
  changePassword,
  confirmChangePassword,
  isChangingPassword,
  handleChange,
  handleChangePassword,
  changePasswordErrorMessage
}) => (
  <>
    <form onSubmit={handleChangePassword} action="POST">
      <Container
        className="themed-container"
        fluid={true}
        style={{ marginTop: 5 }}
      >
        <Label style={{ color: '#ddd', marginBottom: 25, fontSize: 22 }}>
          MUDAR SENHA
        </Label>

        <Input
          type="password"
          minLength={8}
          required
          placeholder="Senha"
          value={changePassword}
          name="changePassword"
          onChange={handleChange}
          style={{ marginBottom: 25 }}
        />

        <Input
          type="password"
          minLength={8}
          required
          placeholder="Confirmar Senha"
          name="confirmChangePassword"
          value={confirmChangePassword}
          onChange={handleChange}
          style={{ marginBottom: 25 }}
        />
        <p className="mt-2" style={{ marginBottom: 20, color:"#fd5d93" }}>{changePasswordErrorMessage}</p>
      </Container>

      <Container
        className="themed-container"
        fluid={true}
        style={{ marginBottom: 25 }}
      >
        <Button id="btn-login" color="primary" disabled={isChangingPassword}>
          {isChangingPassword ? (
            <>
              <i className="fa fa-spinner fa-spin" /> Carregando{' '}
            </>
          ) : (
            <> MUDAR SENHA </>
          )}
        </Button>
      </Container>
    </form>

    <Container
      className="themed-container text-center"
      fluid={true}
      style={{ marginBottom: 10 }}
    >
      <Link to="/authentication/login" className="secondary-link">
        Fazer Login
      </Link>
    </Container>
  </>
)

export default ChangePassword
