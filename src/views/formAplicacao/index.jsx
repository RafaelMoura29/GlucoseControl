import React from "react";
import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager.js'
import './style.css'
import api from '../../variables/api'

import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Label,
  CardFooter,
  ModalHeader,
  Form
} from "reactstrap";


class FormAplicacao extends React.Component {

  constructor(props) {
    super()
    this.state = {
      LoadingSpinner: false,
      ModalMessager: false,
      ModalMessagerText: "",
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

  formataDataHora(data) {
    let dataHora = data.split(" ");
    let hora = dataHora[1]
    let dataFormatada = dataHora[0]
    dataFormatada = dataFormatada.substring(0, 10).split("-");
    dataFormatada = dataFormatada[2] + "/" + dataFormatada[1] + "/" + dataFormatada[0] + " " + hora;
    return dataFormatada;
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this._idPaciente = params._idPaciente;
    this.getPaciente()

    let dateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    //Separa data da hora
    dateTime = dateTime.split(" ")
    //Separa mes, dia e ano
    let data = dateTime[0].split("/")
    //Ajustando formato da data
    data = data[2] + "-" + data[1] + "-" + data[0]
    //Hora atual
    let hora = dateTime[1].substring(0, 5)
    this.setState({
      form: {
        ...this.state.form,
        dataAplicacao: data,
        horaAplicacao: hora
      }
    })
  }

  toggleMessager = () => {
    if (this.state.nextPage) {
      this.props.history.push('/admin/PainelPaciente/' + this._idPaciente)
    }
    this.setState({ ModalMessager: !this.state.ModalMessager });
  }

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  salvarAplicacao = () => {
    this.setState({ LoadingSpinner: true });

    let form = this.state.form

    if (
      form.dataAplicacao === '' ||
      form.horaAplicacao === '' ||
      form.tipoAplicacao === '' ||
      form.viaAdministracao === '' ||
      form.droga === '' ||
      form.posologia === ''
    ) {
      return this.setState({
        LoadingSpinner: false,
        ModalMessager: true,
        ModalMessagerText: 'Preencha todos os campos!',
      });
    }

    let dataCriacao = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    api.post("/aplicacao", {
      dataAplicacao: form.dataAplicacao,
      horaAplicacao: form.horaAplicacao,
      tipoAplicacao: form.tipoAplicacao,
      viaAdministracao: form.viaAdministracao,
      droga: form.droga,
      posologia: form.posologia,
      observacoes: form.observacoes,
      createDate: dataCriacao,
      updateDate: dataCriacao,
      _idPaciente: this._idPaciente,
    })
      .then(response => {
        this.setState({
          LoadingSpinner: false,
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
        });
      })
      .catch(error => {
        this.setState({
          LoadingSpinner: false,
          ModalMessager: true,
          ModalMessagerText: 'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
        });
      })
  }

  getPaciente = () => {
    api.get("/paciente?tagId=" + this._idPaciente)
      .then((response) => {
        const paciente = response.data.paciente[0]
        this.setState({
          form: {
            ...this.state.form,
            prontuario: paciente.prontuario,
            paciente: paciente.nome,
            dataHoraInternacao: paciente.dataInternacao + ' ' + paciente.horaInternacao
          }
        })
      })

  }

  render() {
    let opcoesDroga = this.state.form.tipoAplicacao === 'de resgate'
      ? ['', 'Insulina Ultra Rápida', 'Insulina Regular', 'Glicose a 50%', 'Glicose a 25%']
      : ['', 'Insulina NPH', 'Insulina Lenta - Detemir', 'Insulina Ultra Lenta - Glargina', 'Insulina Ultra Rápida', 'Insulina Regular', 'Glicose a 50%', 'Glicose a 25%']

    return (
      <>
        <div className="content">
          <ModalMessager
            visible={this.state.ModalMessager}
            text={this.state.ModalMessagerText}
            toggle={() => {

              this.setState({
                ModalMessager: false,
              });
            }}
          >
            <ModalHeader toggle={this.toggleMessager}></ModalHeader>
          </ModalMessager>

          <LoadingSpinner visible={this.state.LoadingSpinner} />
          <Row>

            <Card>
              <CardBody>
                <Form>
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
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>DATA/HORA INTERNAÇÃO</label>
                            <Input
                              placeholder="Data/Hora"
                              type="text"
                              name="dataHoraInternacao"
                              value={this.state.form.dataHoraInternacao}
                              disabled
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
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>DATA APLICAÇÃO</label>
                            <Input
                              type="date"
                              placeholder="Data Aplicação"
                              value={this.state.form.dataAplicacao}
                              onChange={this.handleChange}
                              name="dataAplicacao"
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>HORA APLICAÇÃO</label>
                            <Input
                              placeholder="Hora Aplicação"
                              type="time"
                              name="horaAplicacao"
                              value={this.state.form.horaAplicacao}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="12">
                          <FormGroup>
                            <label>TIPO APLICAÇÃO</label>
                            <Input
                              type="select"
                              name="tipoAplicacao"
                              value={this.state.form.tipoAplicacao}
                              onChange={this.handleChange}
                            >
                              <option style={{ backgroundColor: '#27293d' }} value="de resgate">De Resgate</option>
                              <option style={{ backgroundColor: '#27293d' }} value="de horario">De Horário</option>
                            </Input>
                          </FormGroup>
                        </Col>

                      </Row>
                    </Col>

                    <Col className="pr-md-1" md="6">

                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>VIA ADMINISTRAÇÃO</label>
                          <Input
                            type="select"
                            name="viaAdministracao"
                            value={this.state.form.viaAdministracao}
                            onChange={this.handleChange}
                          >
                            <option style={{ backgroundColor: '#27293d' }} value="intravenoso">Intravenoso</option>
                            <option style={{ backgroundColor: '#27293d' }} value="sub cutaneo">Sub Cutâneo</option>
                            <option style={{ backgroundColor: '#27293d' }} value="via oral">Via Oral</option>
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>DROGA</label>
                          <Input
                            type="select"
                            name="droga"
                            value={this.state.form.droga}
                            onChange={this.handleChange}
                          >
                            {opcoesDroga.map((opcao, index) => (
                              <option key={index} style={{ backgroundColor: '#27293d' }} value={opcao}>{opcao}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>POSOLOGIA</label>
                          <Input
                            placeholder="Posologia"
                            type="text"
                            name="posologia"
                            value={this.state.form.posologia}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <Label>Observações</Label>
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
                </Form>
              </CardBody>

              <CardFooter>
                <Button className="btn-fill" color="info" type="submit" onClick={this.salvarAplicacao}>
                  SALVAR APLICAÇÃO
                </Button>
                <Button 
                  className="btn-fill" color="danger"
                  onClick={() => this.props.history.goBack()}
                >
                  CANCELAR
                  </Button>
              </CardFooter>
            </Card>
          </Row>
        </div>
      </>
    );
  }
}

export default FormAplicacao;
