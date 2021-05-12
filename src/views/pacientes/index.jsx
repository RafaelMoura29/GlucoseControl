import React from 'react'
import { Row, Col, Card, CardBody, Modal, ModalBody, ModalFooter, Button, ModalHeader, FormGroup, Input, Alert } from 'reactstrap'
import api from '../../variables/api'
import './style.css'
import TabelaPacientes from './components/tabelaPacientes'
import Filtros from './components/filtros'
import axios from 'axios'

class Pacientes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pacientes: [],
      pacientesFiltrados: [],
      nomePacienteFiltro: '',
      statusFiltro: 'todos',
      LoadingSpinner: false,
      isLoading: true,
      modalDemo: false,
      qtdPacientesSimulados: 0,
      isSimulatingPatients: false,
      successMessage: null,
      timeout: null
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  async getPacientes() {
    this.setState({ isLoading: true })

    api
      .get('/paciente')
      .then(({ data: { paciente } }) => {
        console.log(paciente)
        let pacientes = paciente.map(paciente => {
          let dataInternacao = new Date(paciente.dataHoraInternacao)
          dataInternacao =
            dataInternacao.getDate() +
            '/' +
            (dataInternacao.getMonth() + 1) +
            '/' +
            dataInternacao.getFullYear()

            let dataMonitoramento = new Date(paciente.monitoramento)
            dataMonitoramento =
            dataMonitoramento.getDate() +
              '/' +
              (dataMonitoramento.getMonth() + 1) +
              '/' +
              dataMonitoramento.getFullYear()

          return {
            _id: paciente._id,
            nome: paciente.nome,
            prontuario: paciente.prontuario,
            dataInternacao: dataInternacao,
            statusPaciente: paciente.statusPaciente,
            tratamento: this.setRecomendacao(paciente.tratamento),
            monitoramento: dataMonitoramento
          }
        })
        this.setState({ pacientes, pacientesFiltrados: pacientes })
        console.log(pacientes)
      })
      .catch(error => {
        alert(
          'Ocorreu um erro ao caregar os pacientes! Tente novamente em instantes.'
        )
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  setRecomendacao = (recomendacao) => {
    if(recomendacao === "Glicose: 4 AMP - 50% IV" || recomendacao === "Glicose: 4 AMP - 50% IV (Prev. 4h)"){
      return {text: recomendacao, color: "#FD7664"}
    }
    else if(recomendacao === "Glicose: 2 AMP - 50% IV" || recomendacao === "Glicose: 2 AMP - 50% IV (Prev. 4h)"){
      return {text: recomendacao, color: "#E2A134"}
    }
    else if(recomendacao === "Manter Observação" || recomendacao === "Manter Observação (Prev. 4h)"){
      return {text: recomendacao, color: "#1EBE9B"}
    }
    else if(recomendacao === "Insulina Regular: 2 UN - SC" || recomendacao === "Insulina Regular: 2 UN - SC (Prev. 4h)"){
      return {text: recomendacao, color: "#CFC24F"}
    }
    else if(recomendacao === "Insulina Regular: 4 UN - SC" || recomendacao === "Insulina Regular: 4 UN - SC (Prev. 4h)"){
      return {text: recomendacao, color: "#E2A134"}
    }
    else if(recomendacao === "Insulina Regular: 6 UN - SC" || recomendacao === "Insulina Regular: 6 UN - SC (Prev. 4h)"){
      return {text: recomendacao, color: "#FD7664"}
    }
    else if(recomendacao === "Coleta de Necessária"){
      return {text: recomendacao, color: "#47A0F6"}
    }
    else if(recomendacao === "Glicemia Inválida!"){
      return {text: recomendacao, color: "#ef7161"}
    }
    else{
      return {text: "Sem recomendação", color: "#d1f0ff"}
    }
  }

  componentDidMount() {
    let successMessage = null
    if (this.props.location.search) {
      let type = this.props.location.search.split("=")[1]

      window.history.replaceState({}, document.title,  `/admin/PainelPaciente/${this._idPaciente}`);

      if (type === 'simulated_patient') {
        successMessage = 'Paciente simulado com sucesso!'
      }
    }
    let timeout = setTimeout(this.cancelTimeout, 3000);

    this.setState({ successMessage, timeout})

    this.getPacientes()
  }

  cancelTimeout = () => {
    this.setState({successMessage: null})
    clearTimeout(this.state.timeout);
  }

  toggleModal(){
    this.setState({
        modalDemo: !this.state.modalDemo
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  simularPacientes = (event) => {
    this.setState({ isSimulatingPatients: true })
    event.preventDefault()
    let qtdPacientes = this.state.qtdPacientesSimulados
    axios.post(`https://patientsimulator.herokuapp.com/patient/${qtdPacientes}`)
      .then((response) => {
        this.getPacientes()
        alert("Pacientes simulados com sucesso!")
      })
      .catch((error) => {
        alert("Ocorreu um erro ao simular novos pacientes! Tente novamente em instantes.")
      })
      .finally(() => {
        this.setState({ isSimulatingPatients: false })
        this.toggleModalSimulate()
      })
  }

  /*
    Faz atualização dos valores dos campos filtros e atualiza listagem dos pacientes
  */
  updateInputValueAndFilter = event => {
    this.setState({ isLoading: true })
    this.setState(
      { [event.target.name]: event.target.value.toLowerCase() },
      () => {
        const { pacientes, nomePacienteFiltro, statusFiltro } = this.state
        const pacientesFiltrados = pacientes.filter(
          ({ nome, statusPaciente }) => {
            let isFilterInName =
              nome.toLowerCase().indexOf(nomePacienteFiltro) !== -1
                ? true
                : false
            const nameFilterConditions =
              isFilterInName || nomePacienteFiltro === ''
            const statusFilterConditions =
              statusFiltro === 'todos' ||
              statusFiltro === statusPaciente.toLowerCase()
            return nameFilterConditions && statusFilterConditions
          }
        )
        this.setState({ pacientesFiltrados, isLoading: false })
      }
    )
  }

  render() {
    return (
      <>
        <div className="content">
          <Card>
            <CardBody>
              <Row>
                <Col className="pr-md-1" md="12">
                  <h3>PACIENTES</h3>
                </Col>
              </Row>

              <Filtros
                status={this.state.statusFiltro}
                nomePaciente={this.state.nomePacienteFiltro}
                toggleFiltro={this.updateInputValueAndFilter}
                toggleModal={this.toggleModal}
              />

              <TabelaPacientes
                pacientes={this.state.pacientesFiltrados}
                history={this.props.history}
                isLoading={this.state.isLoading}
              />
            </CardBody>
          </Card>
        </div>

        <Modal isOpen={this.state.modalDemo} className="text-center" style={{backgroundColor:'red'}}>

          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Simular pacientes
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={this.toggleModal}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>

          <form onSubmit={this.simularPacientes}>
            <ModalBody className="modal-body">
              <Row>

                <Col md="12">
                  <FormGroup className="text-left">
                    <label>Quantidade de pacientes</label>
                    <Input
                      style={{ color: '#ddd' }}
                      name="qtdPacientesSimulados"
                      value={this.state.qtdPacientesSimulados}
                      onChange={this.handleChange}
                      type="number"
                      required
                    />
                  </FormGroup>
                </Col>

              </Row>
            </ModalBody>

            <ModalFooter className="d-flex justify-content-center modal-footer">
              <Button type="submit" color="secondary" className="w-100" disabled={this.state.isSimulatingPatients} onClick={() => {}}>
                { this.state.isSimulatingPatients ? <><i className="fa fa-spinner fa-spin" /> Carregando </>  : <> SIMULAR </> }
              </Button>
            </ModalFooter>
          </form>

        </Modal>
        {this.state.successMessage &&
        <Alert color="success" id="alertSuccess">{this.state.successMessage}</Alert>
        }
      </>
    )
  }
}

export default Pacientes
