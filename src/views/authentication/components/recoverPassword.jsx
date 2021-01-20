import React from 'react'

import {
  Button,
  Input,
  Label,
  Container,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap'

import { Link } from 'react-router-dom'

const RecoverPassword = ({
  handleChange,
  isSendingEmail,
  recoverPasswordEmail,
  handleSendEmail
}) => (
  <>

    {/* <Modal
      isOpen={true}
      toggle={() => {}}
      className="text-center"
    >
      <ModalBody>
        <p>E-mail com link para recuperação da senha enviado com sucesso!</p>
      </ModalBody>
      <ModalFooter
        className="d-flex justify-content-center"
      >
        <Button color="secondary" onClick={() => {}}>
          ENTENDI
        </Button>
      </ModalFooter>
    </Modal> */}

    <Container className="themed-container" fluid={true}>
      <p style={{ color: '#ddd', textAlign: 'justify', fontSize: '1.2em' }}>
        Utilize o e-mail cadastrado para recuperar a senha.
      </p>
    </Container>
    <form onSubmit={handleSendEmail} action="POST">
      <Container
        className="themed-container"
        fluid={true}
        style={{ marginTop: 35 }}
      >
        <Label style={{ color: '#ddd', marginBottom: 25, fontSize: 22 }}>
          RESGATAR SENHA
        </Label>

        <Input
          type="email"
          placeholder="E-mail"
          style={{ marginBottom: 25 }}
          value={recoverPasswordEmail}
          onChange={handleChange}
          name="recoverPasswordEmail"
          required
        />
      </Container>

      <Container
        className="themed-container"
        fluid={true}
        style={{ marginBottom: 25 }}
      >
        <Button id="btn-login" color="primary" disabled={isSendingEmail}>
          {isSendingEmail ? (
            <>
              <i className="fa fa-spinner fa-spin" /> Carregando{' '}
            </>
          ) : (
            <> ENVIAR EMAIL </>
          )}
        </Button>
      </Container>
    </form>

    <Container className="themed-container text-center" fluid={true}>
      <Link to="/authentication/login" className="secondary-link">
        Fazer login
      </Link>
    </Container>
  </>
)

export default RecoverPassword
