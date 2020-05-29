import React from "react";
import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager.js'
import './style.css'
import api from '../../variables/api'
import FormularioAplicacao from './components/form'
import FormFooter from './components/formFooter'

import {
  Card,
  CardBody,
  Row,
  Col,
  ModalHeader,
} from "reactstrap";


class FormAplicacao extends React.Component {

  constructor(props) {
    super(props)
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

  /* 
    Seta data/hora atual e pega o id do paciente
  */
  componentDidMount() {
    const { match: { params } } = this.props
    this._idPaciente = params._idPaciente
    this.getPaciente()

    const data = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
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
    api.get("/paciente?tagId=" + this._idPaciente)
      .then(({ data: { paciente } }) => {
        paciente = paciente[0]
        this.setState({
          form: {
            ...this.state.form,
            prontuario: paciente.prontuario,
            paciente: paciente.nome,
            dataHoraInternacao: this.formataData(paciente.dataInternacao) + ' ' + paciente.horaInternacao
          }
        })
      })
  }

  formataData(data) {
    let splitData = data.substring(0, 10).split("-")
    return splitData[2] + "/" + splitData[1] + "/" + splitData[0]
  }
  
  /* 
    Seta prox ação ao fechar o modal messager
  */
  toggleMessager = () => {
    if (this.state.nextPage) {
      this.props.history.push('/admin/PainelPaciente/' + this._idPaciente)
    }
    this.setState({ ModalMessager: !this.state.ModalMessager });
  }

  handleChange = (event) => {
    this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value } })
  }

  /* 
    Verifica se todos campos estão preenchidos e salva a aplicação
  */
  salvarAplicacao = () => {
    this.setState({ LoadingSpinner: true })

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
      })
    }

    api.post("/aplicacao", {
      dataAplicacao: form.dataAplicacao,
      horaAplicacao: form.horaAplicacao,
      tipoAplicacao: form.tipoAplicacao,
      viaAdministracao: form.viaAdministracao,
      droga: form.droga,
      posologia: form.posologia,
      observacoes: form.observacoes,
      createDate: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      updateDate: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      _idPaciente: this._idPaciente,
    })
      .then((response) => {
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
      .catch((error) => {
        this.setState({
          LoadingSpinner: false,
          ModalMessager: true,
          ModalMessagerText: 'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
        });
      })
  }

  /* 
    Volta para a página do paciente
  */
  toggleCancelar = () => this.props.history.push('/admin/PainelPaciente/' + this._idPaciente)

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
          >
            <ModalHeader toggle={this.toggleMessager}></ModalHeader>
          </ModalMessager>

          <LoadingSpinner visible={this.state.LoadingSpinner} />

          <Row>
            <Card>
              <CardBody>

                <Row >
                  <Col className="pr-md-1" md="12">
                    <h3>APLICAÇÃO</h3>
                  </Col>
                </Row>

                <FormularioAplicacao
                  {...this.state.form}
                  opcoesDroga={opcoesDroga}
                  handleChange={this.handleChange}
                />

              </CardBody>

              <FormFooter
                salvarAplicacao={this.salvarAplicacao}
                toggleCancelar={this.toggleCancelar}
              />

            </Card>
          </Row>
        </div>
      </>
    );
  }
}

export default FormAplicacao;
