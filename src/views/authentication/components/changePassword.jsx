import React from "react";

import { Button, Input, Label, Container } from "reactstrap";

import { Link } from "react-router-dom";

const ChangePassword = ({
  changePassword,
  confirmChangePassword,
  isChangingPassword,
  handleChange,
  handleChangePassword,
}) => (
  <>
    <form onSubmit={handleChangePassword} action="POST">
      <Container
        className="themed-container"
        fluid={true}
        style={{ marginTop: 5 }}
      >
        <Label style={{ color: "#ddd", marginBottom: 25, fontSize: 22 }}>
          MUDAR SENHA
        </Label>

        <Input
          type="password"
          placeholder="Senha"
          value={changePassword}
          name="changePassword"
          onChange={handleChange}
          style={{ marginBottom: 25 }}
        />

        <Input
          type="password"
          placeholder="Confirmar Senha"
          name={confirmChangePassword}
          value={confirmChangePassword}
          onChange={handleChange}
          style={{ marginBottom: 25 }}
        />
      </Container>

      <Container
        className="themed-container"
        fluid={true}
        style={{ marginBottom: 25 }}
      >
        <Button id="btn-login" color="primary">
          {isChangingPassword ? (
            <>
              <i className="fa fa-spinner fa-spin" /> Carregando{" "}
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
);

export default ChangePassword;
