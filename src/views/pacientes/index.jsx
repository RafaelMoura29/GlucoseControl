import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import api from '../../variables/api'
import './style.css'
import TabelaPacientes from './components/tabelaPacientes'
import Filtros from './components/filtros'

class Pacientes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pacientes: [],
      pacientesFiltrados: [],
      nomePacienteFiltro: '',
      statusFiltro: 'todos',
      LoadingSpinner: false,
      isLoading: true
    }
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
            statusPaciente: paciente.statusPaciente
          }
        })
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
    console.log(this.state.isLoading)
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
              />

              <TabelaPacientes
                pacientes={this.state.pacientesFiltrados}
                history={this.props.history}
                isLoading={this.state.isLoading}
              />
            </CardBody>
          </Card>
        </div>
      </>
    )
  }
}

export default Pacientes
