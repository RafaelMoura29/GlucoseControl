import React from "react";
import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager.js'
import './style.css'

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
  Label,
  ModalHeader
} from "reactstrap";

const axios = require('axios');

class Form_create_paciente extends React.Component {
  constructor(props) {
    let dateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    //Separa data da hora
    dateTime = dateTime.split(" ")
    //Separa mes, dia e ano
    let dataInternacao = dateTime[0].split("/")
    //Ajustando formato da data
    dataInternacao = dataInternacao[2] + "-" + dataInternacao[1] + "-" + dataInternacao[0]
    //Hora atual
    let horaInternacao = dateTime[1].substring(0, 5)

    super(props);
    this.state = {
      modal: false,
      fade: true,
      LoadingSpinner: false,
      ModalMessager: false,
      ModalMessagerText: '',
      idPaciente: 0,
      redirectUrl: '',
      textBtnRequest: '',
      requestType: '',
      form: {
        prontuario: '',
        nome: '',
        dataNascimento: '',
        sexo: '',
        peso: 70.5,
        altura: 170,
        dataInternacao: dataInternacao,
        horaInternacao: horaInternacao,
        tipoInternacao: 'Clínica',
        diabetes: 'Ignorado',
        insuficienciaRenal: 'Ignorado',
        corticoide: 'Ignorado',
        infeccao: 'Ignorado',
        sindromeDesconfortoRespiratorio: 'Ignorado',
        instabilidadeHemodinamica: 'Ignorado',
        internado: true,
        alta: false,
        planoAplicacao: [
          false, false, false, false, false, true,
          false, false, false, false, false, true,
          false, false, false, false, false, true,
          false, false, false, false, false, false,
        ],
        observacoes: '',
        glicemia: [],
        aplicacao: []
      }
    }
  }

  componentDidMount() {
    this.setState({ LoadingSpinner: true, modal: false, });
    const { match: { params } } = this.props;
    if (params._idPaciente !== '0') {
      axios.get("https://glucosecontrolapp.herokuapp.com/paciente?tagId=" + params._idPaciente)
        .then(({ data }) => {
          const paciente = data.paciente[0]
          let state = this.state
          state.idPaciente = paciente._id
          state.textBtnRequest = 'ATUALIZAR'
          state.requestType = 'put'
          state.form.prontuario = paciente.prontuario
          state.form.nome = paciente.nome
          state.form.dataNascimento = paciente.dataNascimento
          state.form.sexo = paciente.sexo
          state.form.peso = paciente.peso
          state.form.altura = paciente.altura
          state.form.dataInternacao = paciente.dataInternacao
          state.form.horaInternacao = paciente.horaInternacao
          state.form.tipoInternacao = paciente.tipoInternacao
          state.form.diabetes = paciente.diabetes
          state.form.insuficienciaRenal = paciente.insuficienciaRenal
          state.form.corticoide = paciente.corticoide
          state.form.infeccao = paciente.infeccao
          state.form.sindromeDesconfortoRespiratorio = paciente.sindromeDescRespiratorio
          state.form.instabilidadeHemodinamica = paciente.instabilidadeHemodinamica
          state.form.internado = paciente.estadoPaciente !== 'alta'
          state.form.alta = paciente.estadoPaciente === 'alta'
          state.form.planoAplicacao = state.form.planoAplicacao.map((hora) => false)
          paciente.planoAplicacao.split("#").map(hora => (
            state.form.planoAplicacao[parseInt(hora) - 1] = true
          ))
          state.form.observacoes = paciente.observacoes
          state.form.glicemia = paciente.glicemia
          state.form.aplicacao = paciente.aplicacao
          this.setState(state)
        })
        .finally((e) => this.setState({ LoadingSpinner: false }))
    } else {
      this.setState({
        LoadingSpinner: false,
        textBtnRequest: "SALVAR",
        requestType: 'post'
      });
    }
  }

  togglePlanoAplicacao = () => this.setState({ modal: !this.state.modal });

  toggleMessager = () => {
    if (this.state.redirectUrl !== null) {
      document.location.href = this.state.redirectUrl
    }
    this.setState({ ModalMessager: !this.state.ModalMessager });
  }

  updateInputValue = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  updateCheckValue = (event) => {
    let state = this.state
    if (event.target.name === 'alta' || event.target.name === 'internado') {
      state.form.alta = !this.state.form.alta
      state.form.internado = !this.state.form.internado
      return this.setState(state)
    }
    state.form[event.target.name] = event.target.checked
    this.setState(state)
  }

  updateCheckedAplicacao = (event) => {
    let state = this.state
    state.form.planoAplicacao[event.target.name] = event.target.checked
    this.setState(state)
  }

  salvarPaciente = (planoAplicacao) => {

    let dataCriacao = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    let form = this.state.form

    //Gravando paciente
    axios.post("https://glucosecontrolapp.herokuapp.com/paciente", {
      "prontuario": form.prontuario,
      "nome": form.nome,
      "dataNascimento": form.dataNascimento,
      "sexo": form.sexo,
      "peso": form.peso,
      "altura": form.altura,
      "imc": form.peso / ((form.altura / 100) * (form.altura / 100)),
      "dataInternacao": form.dataInternacao,
      "horaInternacao": form.horaInternacao,
      "tipoInternacao": form.tipoInternacao,
      "diabetes": form.diabetes,
      "insuficienciaRenal": form.insuficienciaRenal,
      "corticoide": form.corticoide,
      "infeccao": form.infeccao,
      "sindromeDescRespiratorio": form.sindromeDesconfortoRespiratorio,
      "instabilidadeHemodinamica": form.instabilidadeHemodinamica,
      "statusPaciente": form.alta ? "alta" : "internado",
      "planoAplicacao": planoAplicacao,
      "observacoes": form.observacoes,
      "createDate": dataCriacao,
      "updateDate": dataCriacao,
      "glicemia": form.glicemia,
      "aplicacao": form.aplicacao
    })
      .then(response => {
        const url = this.state.redirectUrl === '/admin/Form_glicemia/0'
          ? '/admin/Form_glicemia/' + response.data.paciente._id
          : this.state.redirectUrl

        this.setState({
          LoadingSpinner: false,
          ModalMessager: true,
          ModalMessagerText: 'Dados Gravados Com Sucesso',
          redirectUrl: url
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

  atualizarPaciente = (planoAplicacao) => {

    let dataAtualizacao = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    let form = this.state.form

    axios.put("https://glucosecontrolapp.herokuapp.com/paciente",
      {
        "_id": this.state.idPaciente,
        "dataUpdated": {
          "prontuario": form.prontuario,
          "nome": form.nome,
          "dataNascimento": form.dataNascimento,
          "sexo": form.sexo,
          "peso": form.peso,
          "altura": form.altura,
          "imc": form.peso / ((form.altura / 100) * (form.altura / 100)),
          "dataInternacao": form.dataInternacao, 
          "horaInternacao": form.horaInternacao, 
          "tipoInternacao": form.tipoInternacao,
          "diabetes": form.diabetes,
          "insuficienciaRenal": form.insuficienciaRenal,
          "corticoide": form.corticoide,
          "infeccao": form.infeccao,
          "sindromeDescRespiratorio": form.sindromeDesconfortoRespiratorio,
          "instabilidadeHemodinamica": form.instabilidadeHemodinamica,
          "statusPaciente": form.alta ? "alta" : "internado",
          "planoAplicacao": planoAplicacao,
          "observacoes": form.observacoes,
          "updateDate": dataAtualizacao,
          "glicemia":  form.glicemia,
          "aplicacao":  form.aplicacao
        }
      }
    )
      .then(response => this.showOrHideMessager(false, true, 'Dados Gravados Com Sucesso', this.state.redirectUrl))
      .catch(error => (
        this.showOrHideMessager(false, true, 'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!')
      ))
  }

  showOrHideMessager = (LoadingSpinner, ModalMessager, ModalMessagerText, redirectUrl = null) => {
    this.setState({
      LoadingSpinner: LoadingSpinner,
      ModalMessager: ModalMessager,
      ModalMessagerText: ModalMessagerText,
      redirectUrl: redirectUrl
    });
  }

  verificarPreenchimentoForm = (event) => {
    //Url para redirecionamento após salvar/atualizar paciente
    let url = event.target.name === 'btnColeta'
      ? '/admin/Form_glicemia/' + this.state.idPaciente
      : event.target.name === 'btnAplicacao'
        ? '/admin/formAplicacao/' + this.state.idPaciente
        : '/admin/pacientes/'

    this.setState({ LoadingSpinner: true, modal: false, redirectUrl: url });

    let form = this.state.form

    if (form.altura < 0) {
      return this.showOrHideMessager(false, true, 'Preencha o campo altura com um valor válido!')
    }

    if (form.peso < 0) {
      return this.showOrHideMessager(false, true, 'Preencha o campo peso com um valor válido!')
    }

    //Verifica se o formulário está preenchido
    if (form.prontuario === '' ||
      form.nome === '' ||
      form.dataNascimento === '' ||
      form.tipoInternacao === '' ||
      form.diabetes === '' ||
      form.insuficienciaRenal === '' ||
      form.corticoide === '' ||
      form.sexo === '' ||
      form.dataInternacao === '' ||
      form.horaInternacao === '' ||
      form.alta === '' ||
      form.peso === '' ||
      form.altura === '' ||
      form.instabilidadeHemodinamica === '' ||
      form.infeccao === '' ||
      form.sindromeDesconfortoRespiratorio === '') {
      return this.showOrHideMessager(false, true, 'Preencha todos os campos!')
    }

    //Monta a string do plano de aplicação
    let planoAplicacao = form.planoAplicacao.reduce((acumulador, hora, index) => (
      hora === true ? acumulador + (index + 1) + "#" : acumulador + ''
    ), '').slice(0, -1)

    if (this.state.requestType === "post") {
      this.salvarPaciente(planoAplicacao)
    }
    this.atualizarPaciente(planoAplicacao)
  }

  toggleModalMesseger = () => {
    if (this.state.redirectUrl !== null) {
      return document.location.href = this.state.redirectUrl
    }
    this.setState({ ModalMessager: false })
  }

  render() {
    return (
      <>
        <div className="content">
          <LoadingSpinner visible={this.state.LoadingSpinner} />

          <ModalMessager
            visible={this.state.ModalMessager}
            text={this.state.ModalMessagerText}
            toggle={this.toggleModalMesseger}
          >
            <ModalHeader toggle={this.toggleMessager}></ModalHeader>
          </ModalMessager>

          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <Row>

                          <Col className="pr-md-1" md="12">
                            <FormGroup>
                              <label>NOME</label>
                              <Input
                                placeholder="NOME"
                                type="text"
                                name="nome"
                                onChange={this.updateInputValue}
                                value={this.state.form.nome}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>PRONTUÁRIO</label>
                              <Input
                                placeholder="PRONTUÁRIO"
                                type="text"
                                name="prontuario"
                                onChange={this.updateInputValue}
                                value={this.state.form.prontuario}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>DATA NASCIMENTO</label>
                              <Input
                                pattern="\d{2}/\d{2}/\d{4}"
                                type="date"
                                name="dataNascimento"
                                placeholder="datetime placeholder"
                                onChange={this.updateInputValue}
                                value={this.state.form.dataNascimento}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>SEXO</label>
                              <Input
                                name="sexo"
                                type="select"
                                onChange={this.updateInputValue}
                                value={this.state.form.sexo}>
                                <option style={{ backgroundColor: '#27293d' }}></option>
                                <option style={{ backgroundColor: '#27293d' }}>Masculino</option>
                                <option style={{ backgroundColor: '#27293d' }}>Feminino</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>TIPO INTERNAÇÃO</label>
                              <Input
                                type="select"
                                name="tipoInternacao"
                                onChange={this.updateInputValue}
                                value={this.state.form.tipoInternacao}>
                                <option style={{ backgroundColor: '#27293d' }}>clínica</option>
                                <option style={{ backgroundColor: '#27293d' }}>cirurgica de urgência</option>
                                <option style={{ backgroundColor: '#27293d' }}>cirurgica eletiva</option>
                                <option style={{ backgroundColor: '#27293d' }}>sindorme coronariana aguda</option>
                                <option style={{ backgroundColor: '#27293d' }}>acidente vascular encefálico</option>
                                <option style={{ backgroundColor: '#27293d' }}>trauma</option>
                                <option style={{ backgroundColor: '#27293d' }}>oncológica</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>DATA INTERNAÇÃO</label>
                              <Input
                                type="date"
                                name="dataInternacao"
                                placeholder="datetime placeholder"
                                onChange={this.updateInputValue}
                                value={this.state.form.dataInternacao}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>HORA INTERNAÇÃO</label>
                              <Input
                                type="time"
                                name="horaInternacao"
                                placeholder="datetime placeholder"
                                onChange={this.updateInputValue}
                                value={this.state.form.horaInternacao}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>ALTURA (CM)</label>
                              <Input
                                min={0}
                                max={300}
                                type="number"
                                name="altura"
                                placeholder="170"
                                onChange={this.updateInputValue}
                                value={this.state.form.altura}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label>PESO (KG)</label>
                              <Input
                                min={0}
                                max={300}
                                type="number"
                                placeholder="70,5"
                                name="peso"
                                onChange={this.updateInputValue}
                                value={this.state.form.peso}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="mb-4" md="12">
                            <FormGroup check inline className="form-check-radio">
                              <Label className="form-check-label">
                                <Input
                                  type="radio"
                                  name="internado"
                                  onChange={this.updateCheckValue}
                                  checked={this.state.form.internado}
                                />
                                                                    INTERNADO
                                                                    <span className="form-check-sign" />
                              </Label>
                            </FormGroup>

                            <FormGroup check inline className="form-check-radio">
                              <Label className="form-check-label">
                                <Input
                                  type="radio"
                                  name="alta"
                                  onChange={this.updateCheckValue}
                                  checked={this.state.form.alta} />
                                                                    ALTA
                                                                    <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </Col>

                          <Col md="12">
                            <label>PLANO DE COLETA</label>
                            <FormGroup check>
                              <Row className="mb-4">
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="0"
                                      checked={this.state.form.planoAplicacao[0]}
                                      onChange={this.updateCheckedAplicacao}
                                    />
                                                                        1h
                                                                        <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="1"
                                      checked={this.state.form.planoAplicacao[1]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            2h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="2"
                                      checked={this.state.form.planoAplicacao[2]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            3h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2" >
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="3"
                                      checked={this.state.form.planoAplicacao[3]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            4h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="4"
                                      checked={this.state.form.planoAplicacao[4]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            5h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="5"
                                      checked={this.state.form.planoAplicacao[5]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            6h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="6"
                                      checked={this.state.form.planoAplicacao[6]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            7h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="7"
                                      checked={this.state.form.planoAplicacao[7]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            8h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="8"
                                      checked={this.state.form.planoAplicacao[8]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            9h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="9"
                                      checked={this.state.form.planoAplicacao[9]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            10h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="10"
                                      checked={this.state.form.planoAplicacao[10]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            11h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="11"
                                      checked={this.state.form.planoAplicacao[11]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            12h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="12"
                                      checked={this.state.form.planoAplicacao[12]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            13h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="13"
                                      checked={this.state.form.planoAplicacao[13]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            14h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="14"
                                      checked={this.state.form.planoAplicacao[14]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            15h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="15"
                                      checked={this.state.form.planoAplicacao[15]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            16h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="16"
                                      checked={this.state.form.planoAplicacao[16]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            17h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="17"
                                      checked={this.state.form.planoAplicacao[17]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            18h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="18"
                                      checked={this.state.form.planoAplicacao[18]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            19h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="19"
                                      checked={this.state.form.planoAplicacao[19]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            20h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="20"
                                      checked={this.state.form.planoAplicacao[20]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            21h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="21"
                                      checked={this.state.form.planoAplicacao[21]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            22h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="22"
                                      checked={this.state.form.planoAplicacao[22]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            23h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                                <Col md="2">
                                  <Label className="form-check-label">
                                    <Input
                                      className="form-check-input checkPlano"
                                      type="checkbox"
                                      name="23"
                                      checked={this.state.form.planoAplicacao[23]}
                                      onChange={this.updateCheckedAplicacao} />
                                                                            24h
                                                                            <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Label for="exampleText">DIABETES</Label>
                          <Input
                            type="select"
                            name="diabetes"
                            onChange={this.updateInputValue}
                            value={this.state.form.diabetes}>
                            <option style={{ backgroundColor: '#27293d' }}>Ignorado</option>
                            <option style={{ backgroundColor: '#27293d' }}>Controle domiciliar dietético</option>
                            <option style={{ backgroundColor: '#27293d' }}>Controle domiciliar com hipoglicemiante oral</option>
                            <option style={{ backgroundColor: '#27293d' }}>Controle domiciliar com insulina</option>
                            <option style={{ backgroundColor: '#27293d' }}>Controle domiciliar medicamentoso misto</option>
                            <option style={{ backgroundColor: '#27293d' }}>Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">INSUFICIÊNCIA RENAL</Label>
                          <Input
                            type="select"
                            name="insuficienciaRenal"
                            onChange={this.updateInputValue}
                            value={this.state.form.insuficienciaRenal}
                          >
                            <option style={{ backgroundColor: '#27293d' }}>Ignorado</option>
                            <option style={{ backgroundColor: '#27293d' }}>crônica dialítica</option>
                            <option style={{ backgroundColor: '#27293d' }}>crônica não dialítica</option>
                            <option style={{ backgroundColor: '#27293d' }}>aguda dialítica</option>
                            <option style={{ backgroundColor: '#27293d' }}>aguda não dialítica</option>
                            <option style={{ backgroundColor: '#27293d' }}>Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">CORTICOIDE</Label>
                          <Input
                            type="select"
                            name="corticoide"
                            onChange={this.updateInputValue}
                            value={this.state.form.corticoide}
                          >
                            <option style={{ backgroundColor: '#27293d' }}>Ignorado</option>
                            <option style={{ backgroundColor: '#27293d' }}>a mais de 7 dias</option>
                            <option style={{ backgroundColor: '#27293d' }}>menos de 7 dias</option>
                            <option style={{ backgroundColor: '#27293d' }}>Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">INSTABILIDADE HEMODINÂMICA</Label>
                          <Input
                            type="select"
                            name="instabilidadeHemodinamica"
                            onChange={this.updateInputValue}
                            value={this.state.form.instabilidadeHemodinamica}>
                            <option style={{ backgroundColor: '#27293d' }}>Ignorado</option>
                            <option style={{ backgroundColor: '#27293d' }}>Sim - Controlado sem drogas vasoativas</option>
                            <option style={{ backgroundColor: '#27293d' }}>Sim - Controlado com drogas </option>
                            <option style={{ backgroundColor: '#27293d' }}>Sim - Descontrolado apesar das drogas</option>
                            <option style={{ backgroundColor: '#27293d' }}>Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">INFECÇÃO</Label>
                          <Input
                            type="select"
                            name="infeccao"
                            onChange={this.updateInputValue}
                            value={this.state.form.infeccao}>
                            <option style={{ backgroundColor: '#27293d' }}>Ignorado</option>
                            <option style={{ backgroundColor: '#27293d' }}>Infecção simples</option>
                            <option style={{ backgroundColor: '#27293d' }}>Sepse</option>
                            <option style={{ backgroundColor: '#27293d' }}>Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">SÍDROME DE DESCONFORTO RESPIRATÓRIO</Label>
                          <Input
                            type="select"
                            name="sindromeDesconfortoRespiratorio"
                            onChange={this.updateInputValue}
                            value={this.state.form.sindromeDesconfortoRespiratorio}>
                            <option style={{ backgroundColor: '#27293d' }}>Ignorado</option>
                            <option style={{ backgroundColor: '#27293d' }}>Possui</option>
                            <option style={{ backgroundColor: '#27293d' }}>Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">OBSERVAÇÕES</Label>
                          <Input
                            type="textarea"
                            name="observacoes"
                            onChange={this.updateInputValue}
                            value={this.state.form.observacoes}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <div className="text-center">
                    <Button className="btn-fill" color="info" type="submit" onClick={this.verificarPreenchimentoForm}>
                      {this.state.textBtnRequest}
                    </Button>
                    <Button className="btn-fill" color="warning" name="btnColeta" type="submit" onClick={this.verificarPreenchimentoForm}>
                      {this.state.textBtnRequest} E FAZER COLETA
                                        </Button>
                    <Button className="btn-fill" color="success" name="btnAplicacao" type="submit" onClick={this.verificarPreenchimentoForm}>
                      {this.state.textBtnRequest} E FAZER APLICAÇÃO
                                        </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

        </div>
      </>
    );
  }
}

export default Form_create_paciente;