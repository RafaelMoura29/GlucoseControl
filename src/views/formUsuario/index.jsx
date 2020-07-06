import React from "react";

import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager/modalMessager'
import './style.css'

import api from '../../variables/api'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Row,
  Col,
  ModalHeader,
  Form
} from "reactstrap";

class FormUsuario extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formNome: '',
      formUnidade: 'HRAN',
      formEmail: '',
      formPerfil: 'Médico',
      formSenha: '',
      loadingSpinner: false,
      modalMessager: false,
      modalMessagerText: ''
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  toggleModalMessager = () => this.setState({ modalMessager: false })

  handleLogin = (event) => {
    event.preventDefault()
    this.setState({ loadingSpinner: true })
    const { formNome, formUnidade, formEmail, formPerfil, formSenha } = this.state

    api.post('/register', {
      email: formEmail,
      nome: formNome,
      senha: formSenha,
      unidade: formUnidade,
      perfil: formPerfil
    })
      .then((response) => {
        this.setState({
          loadingSpinner: false,
          modalMessager: true,
          modalMessagerText: 'Dados Gravados Com Sucesso!',
          formNome: '',
          formUnidade: 'HRAN',
          formEmail: '',
          formPerfil: 'Médico',
          formSenha: '',
        })
      })
      .catch((error) => {
        this.setState({
          loadingSpinner: false,
          modalMessager: true,
          modalMessagerText: error.response.data
        })
      })
  }

  render() {
    let { formNome, formUnidade, formEmail, formPerfil, formSenha, modalMessager, modalMessagerText } = this.state
    return (
      <>
        <div className="content">

          <ModalMessager
            visible={modalMessager}
            text={modalMessagerText}
          >
            <ModalHeader toggle={this.toggleModalMessager} />
          </ModalMessager>

          <LoadingSpinner visible={this.state.loadingSpinner} />

          <Row>
            <Card>
              <CardBody>

                <Row >
                  <Col className="pr-md-1" md="12">
                    <h3 style={{ fontSize: 25 }}>CADASTRAR USUÁRIO</h3>
                  </Col>
                </Row>
                <Form onSubmit={this.handleLogin}>

                  <Row>
                    <Col className="pr-md-1" md="6">
                      <label>NOME</label>
                      <Input
                        placeholder="Prontuário"
                        type="text"
                        name="formNome"
                        value={formNome}
                        onChange={this.handleChange}
                        invalid={!formNome}
                        required
                      />
                    </Col>

                    <Col className="pr-md-1" md="6">
                      <label>UNIDADE</label>
                      <Input
                        type="select"
                        name="formUnidade"
                        onChange={this.handleChange}
                        value={formUnidade}
                        invalid={!formUnidade}
                      >
                        <option>HRAN</option>
                      </Input>
                    </Col>

                    <Col className="pr-md-1" md="6">
                      <label>E-mail</label>
                      <Input
                        placeholder="Prontuário"
                        type="email"
                        name="formEmail"
                        value={formEmail}
                        onChange={this.handleChange}
                        invalid={!formEmail}
                        required
                      />
                    </Col>

                    <Col className="pr-md-1" md="6">
                      <label>PERFIL</label>
                      <Input
                        type="select"
                        name="formPerfil"
                        onChange={this.handleChange}
                        value={formPerfil}
                        invalid={!formPerfil}
                      >
                        <option>Médico</option>
                        <option>Enfermeiro</option>
                      </Input>
                    </Col>

                    <Col className="pr-md-1" md="6">
                      <label>SENHA</label>
                      <Input
                        placeholder="Prontuário"
                        type="password"
                        name="formSenha"
                        value={formSenha}
                        onChange={this.handleChange}
                        invalid={!formSenha}
                        required
                        minLength={9}
                      />
                    </Col>

                    <Col className="pr-md-1" md="6" style={{ paddingTop: '18px' }}>
                      <Button className="btn-fill" color="info" type="submit" >
                        SALVAR
                      </Button>
                      <Button className="btn-fill" color="danger" onClick={() => this.props.history.push('/admin/pacientes')}>
                        CANCELAR
                      </Button>
                    </Col>

                  </Row>
                </Form>

              </CardBody>

              <CardFooter />
            </Card>
          </Row>
        </div>
      </>
    )
  }
}

export default FormUsuario