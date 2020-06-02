import React from "react";
import LoadingSpinner from '../../components/LoadingSpinner.js'
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
  Label,
  ModalHeader
} from "reactstrap";

class Form_create_paciente extends React.Component {
  constructor(props) {
    const data = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    const dateAux = data.slice(0, 10).split('/')

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
        dataInternacao: dateAux[2] + '-' + dateAux[1] + '-' + dateAux[0],
        horaInternacao: data.slice(11, 16),
        tipoInternacao: 'Clínica',
        diabetes: 'Ignorado',
        insuficienciaRenal: 'Ignorado',
        corticoide: 'Ignorado',
        infeccao: 'Ignorado',
        sindromeDescRespiratorio: 'Ignorado',
        instabilidadeHemodinamica: 'Ignorado',
        internado: true,
        alta: false,
        planoAplicacao: [
          false, false, false, false, false, false,
          false, false, false, false, false, false,
          false, false, false, false, false, false,
          false, false, false, false, false, false,
        ],
        observacoes: '',
        glicemia: [],
        aplicacao: []
      }
    }
  }

  componentDidMount() {
    this.setState({ LoadingSpinner: true, modal: false })
    const { match: { params } } = this.props
    if (params._idPaciente !== '0') {
      api.get("/paciente?tagId=" + params._idPaciente)
        .then(({ data }) => {
          const {_id, statusPaciente, planoAplicacao, ...paciente} = data.paciente[0]

          let statePlanoAplicacao = this.state.form.planoAplicacao
          planoAplicacao.split("#").map(hora => (
            statePlanoAplicacao[parseInt(hora) - 1] = true
          ))

          this.setState({
            form: {
              ...paciente,
              internado: statusPaciente === 'internado',
              alta: statusPaciente === 'alta',
              planoAplicacao: statePlanoAplicacao
            },
            idPaciente: _id,
            textBtnRequest: 'ATUALIZAR',
            requestType: 'put'
          })

        })
        .finally((e) => {
          this.setState({ LoadingSpinner: false })
        })
    } else {
      this.setState({
        LoadingSpinner: false,
        textBtnRequest: "SALVAR",
        requestType: 'post',
        form: {
          ...this.state.form,
          planoAplicacao: [
            false, false, false, false, false, true,
            false, false, false, false, false, true,
            false, false, false, false, false, true,
            false, false, false, false, false, false,
          ]
        }
      })
    }
  }

  toggleMessager = () => {
    if (this.state.redirectUrl !== null) {
      this.props.history.push(this.state.redirectUrl)
    }
    this.setState({ ModalMessager: !this.state.ModalMessager });
  }

  updateInputValue = (event) => {
    let state = this.state
    state.form[event.target.name] = event.target.value
    this.setState(state)
  }

  updateCheckValue = (event) => {
    let form = this.state.form
    form.alta = !form.alta
    form.internado = !form.internado
    this.setState(form)
  }

  updateCheckedAplicacao = (event) => {
    let form = this.state.form
    form.planoAplicacao[event.target.name] = event.target.checked
    this.setState(form)
  }

  salvarPaciente = (planoAplicacao) => {

    let dataCriacao = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    let form = this.state.form
    //Gravando paciente
    api.post("/paciente", {
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
      "sindromeDescRespiratorio": form.sindromeDescRespiratorio,
      "instabilidadeHemodinamica": form.instabilidadeHemodinamica,
      "statusPaciente": form.alta ? "alta" : "internado",
      "planoAplicacao": planoAplicacao,
      "observacoes": form.observacoes,
      "createDate": dataCriacao,
      "updateDate": dataCriacao,
      "glicemia": form.glicemia,
      "aplicacao": form.aplicacao
    })
      .then(({ data }) => {
        const url = this.state.redirectUrl === '/admin/Form_glicemia/0'
          ? '/admin/Form_glicemia/' + data._id
          : this.state.redirectUrl === '/admin/formAplicacao/0'
            ? '/admin/formAplicacao/' + data._id
            : this.state.redirectUrl

        this.setState({
          LoadingSpinner: false,
          ModalMessager: true,
          ModalMessagerText: 'Dados Gravados Com Sucesso',
          redirectUrl: url
        });
      })
      .catch((error) => {
        this.setState({
          LoadingSpinner: false,
          redirectUrl: null,
          ModalMessager: true,
          ModalMessagerText: 'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
        });
      })
  }

  atualizarPaciente = (planoAplicacao) => {

    let dataAtualizacao = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    let form = this.state.form

    api.put("/paciente",
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
          "sindromeDescRespiratorio": form.sindromeDescRespiratorio,
          "instabilidadeHemodinamica": form.instabilidadeHemodinamica,
          "statusPaciente": form.alta ? "alta" : "internado",
          "planoAplicacao": planoAplicacao,
          "observacoes": form.observacoes,
          "updateDate": dataAtualizacao,
          "glicemia": form.glicemia,
          "aplicacao": form.aplicacao
        }
      }
    )
      .then((response) => this.showOrHideMessager(false, true, 'Dados Gravados Com Sucesso', this.state.redirectUrl))
      .catch((error) => {
        this.setState({
          redirectUrl: null,
        })
        this.showOrHideMessager(false, true, 'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!')
      })
  }

  showOrHideMessager = (LoadingSpinner, ModalMessager, ModalMessagerText, redirectUrl = null) => {
    this.setState({
      LoadingSpinner: LoadingSpinner,
      ModalMessager: ModalMessager,
      ModalMessagerText: ModalMessagerText,
      redirectUrl: redirectUrl
    })
  }

  verificarPreenchimentoForm = (event) => {

    this.setState({ 
      LoadingSpinner: true, 
      modal: false, 
      redirectUrl: event.target.value + this.state.idPaciente
    });

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
      form.sindromeDescRespiratorio === '') {
      return this.showOrHideMessager(false, true, 'Preencha todos os campos!')
    }

    //Monta a string do plano de aplicação
    let planoAplicacao = form.planoAplicacao.reduce((acumulador, hora, index) => (
      hora === true ? acumulador + (index + 1) + "#" : acumulador + ''
    ), '').slice(0, -1)

    if (this.state.requestType === "post") {
      this.salvarPaciente(planoAplicacao)
    } else {
      this.atualizarPaciente(planoAplicacao)
    }
  }

  toggleModalMesseger = () => {
    if (this.state.redirectUrl !== null) {
      return this.props.history.push(this.state.redirectUrl)
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

                  <Row >
                    <Col className="pr-md-1" md="12">
                      <h3 id="titulo-form">CADASTRO PACIENTE</h3>
                    </Col>
                  </Row>

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
                                invalid={!this.state.form.nome}
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
                                invalid={!this.state.form.prontuario}
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
                                invalid={!this.state.form.dataNascimento}
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
                                value={this.state.form.sexo}
                                invalid={!this.state.form.sexo}
                              >
                                <option ></option>
                                <option >Masculino</option>
                                <option >Feminino</option>
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
                                value={this.state.form.tipoInternacao}
                                invalid={!this.state.form.tipoInternacao}
                              >
                                <option >clínica</option>
                                <option >cirurgica de urgência</option>
                                <option >cirurgica eletiva</option>
                                <option >sindorme coronariana aguda</option>
                                <option >acidente vascular encefálico</option>
                                <option >trauma</option>
                                <option >oncológica</option>
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
                                invalid={!this.state.form.dataInternacao}
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
                                invalid={!this.state.form.horaInternacao}
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
                                invalid={!this.state.form.altura}
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
                                invalid={!this.state.form.peso}
                              />
                            </FormGroup>
                          </Col>

                          <Col className="mb-4" md="12">
                            <FormGroup check inline className="form-check-radio">
                              <Label className="form-check-label">
                                <Input
                                  radioGroup="statusPaciente"
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
                                  radioGroup="statusPaciente"
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
                            value={this.state.form.diabetes}
                            invalid={!this.state.form.diabetes}
                          >
                            <option >Ignorado</option>
                            <option >Controle domiciliar dietético</option>
                            <option >Controle domiciliar com hipoglicemiante oral</option>
                            <option >Controle domiciliar com insulina</option>
                            <option >Controle domiciliar medicamentoso misto</option>
                            <option >Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">INSUFICIÊNCIA RENAL</Label>
                          <Input
                            type="select"
                            name="insuficienciaRenal"
                            onChange={this.updateInputValue}
                            value={this.state.form.insuficienciaRenal}
                            invalid={!this.state.form.insuficienciaRenal}
                          >
                            <option >Ignorado</option>
                            <option >crônica dialítica</option>
                            <option >crônica não dialítica</option>
                            <option >aguda dialítica</option>
                            <option >aguda não dialítica</option>
                            <option >Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">CORTICOIDE</Label>
                          <Input
                            type="select"
                            name="corticoide"
                            onChange={this.updateInputValue}
                            value={this.state.form.corticoide}
                            invalid={!this.state.form.corticoide}
                          >
                            <option >Ignorado</option>
                            <option >a mais de 7 dias</option>
                            <option >menos de 7 dias</option>
                            <option >Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">INSTABILIDADE HEMODINÂMICA</Label>
                          <Input
                            type="select"
                            name="instabilidadeHemodinamica"
                            onChange={this.updateInputValue}
                            value={this.state.form.instabilidadeHemodinamica}
                            invalid={!this.state.form.instabilidadeHemodinamica}
                          >
                            <option >Ignorado</option>
                            <option >Sim - Controlado sem drogas vasoativas</option>
                            <option >Sim - Controlado com drogas </option>
                            <option >Sim - Descontrolado apesar das drogas</option>
                            <option >Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">INFECÇÃO</Label>
                          <Input
                            type="select"
                            name="infeccao"
                            onChange={this.updateInputValue}
                            value={this.state.form.infeccao}
                            invalid={!this.state.form.infeccao}
                          >
                            <option >Ignorado</option>
                            <option >Infecção simples</option>
                            <option >Sepse</option>
                            <option >Não tem</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampleText">SÍDROME DE DESCONFORTO RESPIRATÓRIO</Label>
                          <Input
                            type="select"
                            name="sindromeDescRespiratorio"
                            onChange={this.updateInputValue}
                            value={this.state.form.sindromeDescRespiratorio}
                            invalid={!this.state.form.sindromeDescRespiratorio}
                          >
                            <option >Ignorado</option>
                            <option >Possui</option>
                            <option >Não tem</option>
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
                    <Button
                      className="btn-fill"
                      color="info"
                      type="submit"
                      onClick={this.verificarPreenchimentoForm}
                      value="/admin/pacientes/"
                    >
                      {this.state.textBtnRequest}
                    </Button>
                    <Button
                      className="btn-fill"
                      color="warning"
                      name="btnColeta"
                      type="submit"
                      onClick={this.verificarPreenchimentoForm}
                      value="/admin/Form_glicemia/"
                    >
                      {this.state.textBtnRequest} E COLETAR
                    </Button>
                    <Button
                      className="btn-fill"
                      id="btn-aplicar"
                      name="btnAplicacao"
                      type="submit"
                      onClick={this.verificarPreenchimentoForm}
                      value="/admin/formAplicacao/"
                    >
                      {this.state.textBtnRequest} E APLICAR
                    </Button>
                    <Button
                      className="btn-fill"
                      color="danger"
                      onClick={() => this.props.history.goBack()}
                    >
                      CANCELAR
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