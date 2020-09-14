import React from 'react'

import ModalMessager from '../../components/ModalMessager/modalMessager'
import './style.css'
import api from '../../variables/api'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  ModalHeader,
  Label
} from 'reactstrap'

class Form_glicemia extends React.Component {
  constructor(props) {
    let dateTime = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    })
    //Separa data da hora
    dateTime = dateTime.split(' ')
    //Separa mes, dia e ano
    let data = dateTime[0].split('/')
    //Ajustando formato da data
    data = data[2] + '-' + data[1] + '-' + data[0]
    //Hora atual
    let hora = dateTime[1].substring(0, 5)

    super(props)
    this.state = {
      modal: false,
      ModalMessager: false,
      ModalMessagerText: '',
      ModalMessagerTextSecondary: '',
      isLoading: false,
      form: {
        prontuario: '',
        paciente: '',
        dataHoraInternacao: '',
        dataColeta: data,
        valorGlicemia: 110,
        tipo: 'Bioquímica',
        tipoAlimentacao: 'Zero',
        hora: '',
        horaColeta: hora,
        observacoes: '',
        _idPaciente: ''
      }
    }
    this._idPaciente = ''
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props
    this._idPaciente = params._idPaciente
    this.getPaciente()
  }

  toggleMessager = () => {
    this.props.history.push('/admin/PainelPaciente/' + this._idPaciente)
    this.setState({ ModalMessager: !this.state.ModalMessager })
  }

  getPaciente = () => {
    api
      .get('/paciente?tagId=' + this._idPaciente)
      .then(({ data: { paciente } }) => {
        let dt = new Date(paciente[0].dataHoraInternacao)
        this.setState({
          form: {
            ...this.state.form,
            prontuario: paciente[0].prontuario,
            paciente: paciente[0].nome,
            dataHoraInternacao:
              dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
          }
        })
      })
  }

  saveGlicose = event => {
    event.preventDefault()
    this.setState({ isLoading: true })
    let form = this.state.form

    api
      .post('/glicemia', {
        dataHoraColeta: form.dataColeta + ' ' + form.horaColeta,
        tipoColeta: form.tipo,
        tipoAlimentacao: form.tipoAlimentacao,
        valorGlicemia: form.valorGlicemia,
        observacoes: form.observacoes,
        _idPaciente: this._idPaciente
      })
      .then(response => {
        let modalText = ''
        const glicemia = form.valorGlicemia

        if (glicemia >= 0 && glicemia <= 80) {
          modalText = 'aplicar 4 ampolas de glicose a 50% IV'
        } else if (glicemia >= 81 && glicemia <= 180) {
          modalText = 'Manter a observação'
        } else if (glicemia >= 181 && glicemia <= 250) {
          modalText = 'Aplicar 2 Unidades de insulina regular SC'
        } else if (glicemia >= 251 && glicemia <= 300) {
          modalText = 'Aplicar 4 Unidades de insulina regular SC'
        } else if (glicemia >= 301 && glicemia <= 350) {
          modalText = 'Aplicar 6 Unidades de insulina regular SC'
        } else if (glicemia > 350) {
          modalText =
            'Aplicar 8 Unidades de insulina regular SC e comunicar o plantonista.'
        }

        this.setState({
          isLoading: false,
          ModalMessager: true,
          ModalMessagerText: 'Dados Gravados Com Sucesso!',
          ModalMessagerTextSecondary: modalText
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          ModalMessager: true,
          ModalMessagerText:
            'Ocorreu um erro ao salvar a coleta. Tente novamente mais tarde!'
        })
      })
  }

  handleChange = event => {
    let form = this.state.form
    form[event.target.name] = event.target.value
    this.setState(form)
  }

  render() {
    return (
      <>
        <div className="content">
          <ModalMessager
            visible={this.state.ModalMessager}
            text={this.state.ModalMessagerText}
            textSecondary={this.state.ModalMessagerTextSecondary}
            toggle={() => {
              this.setState({
                ModalMessager: false
              })
            }}
          >
            <ModalHeader toggle={this.toggleMessager}></ModalHeader>
          </ModalMessager>

          <Row>
            <Card>
              <Form onSubmit={this.saveGlicose} action="POST">
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <h3 style={{ fontSize: 25 }}>COLETA GLICEMIA</h3>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-md-1" md="6">
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>PRONTUÁRIO</label>
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
                            <label>DATA e HORA INTERNAÇÃO</label>
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
                            <label>PACIENTE</label>
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
                            <label>DATA COLETA</label>
                            <Input
                              type="date"
                              placeholder="Data coleta"
                              value={this.state.form.dataColeta}
                              onChange={this.handleChange}
                              name="dataColeta"
                              required
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>HORA COLETA</label>
                            <Input
                              placeholder="Hora coleta"
                              type="time"
                              name="horaColeta"
                              value={this.state.form.horaColeta}
                              onChange={this.handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="12">
                          <FormGroup>
                            <label>VALOR GLICEMIA</label>
                            <Input
                              placeholder="valor glicemia"
                              type="number"
                              value={this.state.form.valorGlicemia}
                              onChange={this.handleChange}
                              name="valorGlicemia"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>TIPO</label>
                        <Input
                          type="select"
                          name="tipo"
                          value={this.state.form.tipo}
                          onChange={this.handleChange}
                          required
                        >
                          <option style={{ backgroundColor: '#27293d' }}>
                            Capilar
                          </option>
                          <option style={{ backgroundColor: '#27293d' }}>
                            Bioquímica
                          </option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <label>TIPO ALIMENTAÇÃO</label>
                        <Input
                          type="select"
                          name="tipoAlimentacao"
                          value={this.state.form.tipoAlimentacao}
                          onChange={this.handleChange}
                          required
                        >
                          <option style={{ backgroundColor: '#27293d' }}>
                            Zero
                          </option>
                          <option style={{ backgroundColor: '#27293d' }}>
                            Oral líquida
                          </option>
                          <option style={{ backgroundColor: '#27293d' }}>
                            Oral pastosa
                          </option>
                          <option style={{ backgroundColor: '#27293d' }}>
                            Oral completa
                          </option>
                          <option style={{ backgroundColor: '#27293d' }}>
                            Interal intermitente
                          </option>
                          <option style={{ backgroundColor: '#27293d' }}>
                            Interal contínua
                          </option>
                          <option style={{ backgroundColor: '#27293d' }}>
                            Parenteral
                          </option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText">Observações</Label>
                        <Input
                          type="textarea"
                          name="observacoes"
                          placeholder="Observações"
                          value={this.state.form.observacoes}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button disabled={this.state.isLoading} className="btn-fill" color="info" type="submit">
                    {this.state.isLoading ? (
                      <>
                        <i className="fa fa-spinner fa-spin" /> Carregando{' '}
                      </>
                    ) : (
                      <> SALVAR GLICEMIA </>
                    )}
                  </Button>
                  <Button
                    disabled={this.state.isLoading}
                    className="btn-fill"
                    color="danger"
                    onClick={() =>
                      this.props.history.push(
                        '/admin/PainelPaciente/' + this._idPaciente
                      )
                    }
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

export default Form_glicemia
