import React from 'react'
import { Row, Col, Card, CardBody, Modal, ModalBody, ModalFooter, Button, ModalHeader, FormGroup, Input } from 'reactstrap'
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
      isSimulatingPatients: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  async getPacientes() {
    this.setState({ isLoading: true })

    api
      .get('/paciente')
      .then(({ data: { paciente } }) => {
        let pacientes = paciente.map(paciente => {
          let dataInternacao = new Date(paciente.dataHoraInternacao)
          dataInternacao =
            dataInternacao.getDate() +
            '/' +
            dataInternacao.getMonth() +
            '/' +
            dataInternacao.getFullYear()
          return {
            _id: paciente._id,
            nome: paciente.nome,
            prontuario: paciente.prontuario,
            dataInternacao: dataInternacao,
            statusPaciente: paciente.statusPaciente,
            recomendacao: paciente.recomendacao
          }
        })
        console.log(paciente)
        this.setState({ pacientes, pacientesFiltrados: pacientes })
      })
      .catch(error => {
        alert(
          'Ocorreu um erro ao caregar os pacientes! Tente novamente em instantes.'
        )
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  componentDidMount() {
    this.getPacientes()
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
        this.toggleModal()
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

        <Modal isOpen={this.state.modalDemo} className="text-center">
          
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
            <ModalBody>
              <Row>

                <Col md="12">
                  <FormGroup className="text-left">
                    <label>Quantidade de pacientes</label>
                    <Input
                      style={{ color: '#111' }}
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
            
            <ModalFooter className="d-flex justify-content-center">
              <Button type="submit" color="secondary" className="w-100" disabled={this.state.isSimulatingPatients} onClick={() => {}}>
                { this.state.isSimulatingPatients ? <><i className="fa fa-spinner fa-spin" /> Carregando </>  : <> SIMULAR </> }
              </Button>
            </ModalFooter>
          </form>

        </Modal>
      </>
    )
  }
}

export default Pacientes
