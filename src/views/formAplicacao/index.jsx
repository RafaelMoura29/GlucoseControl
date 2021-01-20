import React from 'react'
import ModalMessager from '../../components/ModalMessager/modalMessager'
import './style.css'
import api from '../../variables/api'

import {
  Card,
  CardBody,
  Row,
  Col,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  Form,
  CardFooter,
  Button
} from 'reactstrap'

class FormAplicacao extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalMessager: false,
      ModalMessagerText: '',
      isLoading: false,
      form: {
        prontuario: '',
        dataHoraInternacao: '',
        paciente: '',
        dataAplicacao: '',
        horaAplicacao: '',
        tipoAplicacao: 'de resgate',
        viaAdministracao: 'intravenosa',
        posologia: '',
        observacoes: '',
        droga: ''
      },
      nextPage: false
    }
  }

  /*
    Seta data/hora atual e pega o id do paciente
  */
  componentDidMount() {
    const {
      match: { params }
    } = this.props
    this._idPaciente = params._idPaciente
    this.getPaciente()

    const data = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    })
    const dateAux = data.slice(0, 10).split('/')

    this.setState({
      form: {
        ...this.state.form,
        dataAplicacao: dateAux[2] + '-' + dateAux[1] + '-' + dateAux[0],
        horaAplicacao: data.slice(11, 16)
      }
    })
  }

  /*
    Request para pegar as informações do paciente
  */
  getPaciente = () => {
    api
      .get('/paciente?tagId=' + this._idPaciente)
      .then(({ data: { paciente } }) => {
        paciente = paciente[0]
        let dt = new Date(paciente.dataHoraInternacao)
        this.setState({
          form: {
            ...this.state.form,
            prontuario: paciente.prontuario,
            paciente: paciente.nome,
            dataHoraInternacao:
              dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
          }
        })
      })
  }

  /*
    Seta prox ação ao fechar o modal messager
  */
  toggleMessager = () => {
    if (this.state.nextPage) {
      this.props.history.push('/admin/PainelPaciente/' + this._idPaciente)
    }
    this.setState({ ModalMessager: !this.state.ModalMessager })
  }

  handleChange = event => {
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.value }
    })
  }

  /*
    Verifica se todos campos estão preenchidos e salva a aplicação
  */
  salvarAplicacao = event => {
    event.preventDefault()
    this.setState({ isLoading: true })

    let form = this.state.form

    api
      .post('/aplicacao', {
        dataHoraAplicacao: form.dataAplicacao + ' ' + form.horaAplicacao,
        tipoAplicacao: form.tipoAplicacao,
        viaAdministracao: form.viaAdministracao,
        droga: form.droga,
        posologia: form.posologia,
        observacoes: form.observacoes,
        _idPaciente: this._idPaciente
      })
      .then(response => {
        console.log(response)
        this.setState({
          isLoading: false,
          ModalMessager: true,
          ModalMessagerText: 'Dados Gravados Com Sucesso',
          form: {
            ...this.state.form,
            dataAplicacao: '',
            horaAplicacao: '',
            tipoAplicacao: 'de resgate',
            viaAdministracao: 'intravenosa',
            posologia: '',
            observacoes: '',
            droga: ''
          },
          nextPage: true
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          ModalMessager: true,
          ModalMessagerText:
            'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
        })
      })
  }

  toggleCancelar = () =>
    this.props.history.push('/admin/PainelPaciente/' + this._idPaciente)

  render() {
    let opcoesDroga =
      this.state.form.tipoAplicacao === 'de resgate'
        ? [
            '',
            'Insulina Ultra Rápida',
            'Insulina Regular',
            'Glicose a 50%',
            'Glicose a 25%'
          ]
        : [
            '',
            'Insulina NPH',
            'Insulina Lenta - Detemir',
            'Insulina Ultra Lenta - Glargina',
            'Insulina Ultra Rápida',
            'Insulina Regular',
            'Glicose a 50%',
            'Glicose a 25%'
          ]

    return (
      <>
        <div className="content">
          <ModalMessager
            visible={this.state.ModalMessager}
            text={this.state.ModalMessagerText}
          >
            <ModalHeader toggle={this.toggleMessager}></ModalHeader>
          </ModalMessager>

          <Row>
            <Card>
              <Form onSubmit={this.salvarAplicacao} action="POST">
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <h3>APLICAÇÃO</h3>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-md-1" md="6">
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <Label>PRONTUÁRIO</Label>
                            <Input
                              placeholder="Prontuário"
                              type="text"
                              name="prontuario"
                              value={this.state.form.prontuario}
                              disabled
                              required
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <Label>DATA/HORA INTERNAÇÃO</Label>
                            <Input
                              placeholder="Data/Hora"
                              type="text"
                              name="dataHoraInternacao"
                              value={this.state.form.dataHoraInternacao}
                              disabled
                              required
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="12">
                          <FormGroup>
                            <Label>PACIENTE</Label>
                            <Input
                              placeholder="Paciente"
                              type="text"
                              name="paciente"
                              value={this.state.form.paciente}
                              disabled
                              required
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <Label>DATA APLICAÇÃO</Label>
                            <Input
                              type="date"
                              placeholder="Data Aplicação"
                              value={this.state.form.dataAplicacao}
                              onChange={this.handleChange}
                              name="dataAplicacao"
                              required
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <Label>HORA APLICAÇÃO</Label>
                            <Input
                              placeholder="Hora Aplicação"
                              type="time"
                              name="horaAplicacao"
                              value={this.state.form.horaAplicacao}
                              onChange={this.handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="12">
                          <FormGroup>
                            <Label>TIPO APLICAÇÃO</Label>
                            <Input
                              type="select"
                              name="tipoAplicacao"
                              value={this.state.form.tipoAplicacao}
                              onChange={this.handleChange}
                              required
                            >
                              <option value="de resgate">De Resgate</option>
                              <option value="de horario">De Horário</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>

                    <Col className="pr-md-1" md="6">
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <Label>VIA ADMINISTRAÇÃO</Label>
                          <Input
                            type="select"
                            name="viaAdministracao"
                            value={this.state.form.viaAdministracao}
                            onChange={this.handleChange}
                            required
                          >
                            <option value="intravenoso">Intravenoso</option>
                            <option value="sub cutaneo">Sub Cutâneo</option>
                            <option value="via oral">Via Oral</option>
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <Label>DROGA</Label>
                          <Input
                            type="select"
                            name="droga"
                            value={this.state.form.droga}
                            onChange={this.handleChange}
                            required
                          >
                            {opcoesDroga.map((opcao, index) => (
                              <option key={index} value={opcao}>
                                {opcao}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <Label>POSOLOGIA</Label>
                          <Input
                            placeholder="Posologia"
                            type="number"
                            name="posologia"
                            value={this.state.form.posologia}
                            onChange={this.handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <Label>OBSERVAÇÕES</Label>
                          <Input
                            type="textarea"
                            name="observacoes"
                            placeholder="Observações"
                            value={this.state.form.observacoes}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Col>
                  </Row>
                </CardBody>

                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="info"
                    type="submit"
                    disabled={this.state.isLoading}
                  >
                    {this.state.isLoading ? (
                      <>
                        <i className="fa fa-spinner fa-spin" /> Carregando{' '}
                      </>
                    ) : (
                      <> SALVAR </>
                    )}
                  </Button>

                  <Button
                    className="btn-fill"
                    color="danger"
                    onClick={this.toggleCancelar}
                    disabled={this.state.isLoading}
                  >
                    CANCELAR
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Row>
        </div>
      </>
    )
  }
}

export default FormAplicacao
