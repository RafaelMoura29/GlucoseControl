import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from '../../components/LoadingSpinner.js'
import './style.css'
import { Button, Row, Col, Form, FormGroup, Input, Table, Card, CardBody } from "reactstrap";
import api from '../../variables/api'
import TabelaPacientes from './components/tabelaPacientes'
import Filtros from './components/filtros'

class Pacientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pacientes: [],
      pacienteFiltrados: [],
      nomePacienteFiltro: "",
      tipoInternacaoFiltro: "todos",
      LoadingSpinner: false
    }
  }

  formataData(data) {
    let splitData = data.substring(0, 10).split("-")
    return splitData[2] + "/" + splitData[1] + "/" + splitData[0]
  }

  //Fazendo requisição dos pacientes
  async getPacientes() {
    this.setState({ LoadingSpinner: true });

    api.get("/paciente")
      .then(({ data: { paciente } }) => {
        let pacientes = paciente.map((paciente) => ({
          _id: paciente._id,
          nome: paciente.nome,
          prontuario: paciente.prontuario,
          dataInternacao: this.formataData(paciente.dataInternacao),
          statusPaciente: paciente.statusPaciente
        }))
        this.setState({ pacientes, pacienteFiltrados: pacientes })
      })
      .finally(() => this.setState({ LoadingSpinner: false }))
  }

  componentDidMount() {
    this.getPacientes()
  }

  //Atualiza o state do filtro e filtra os pacientes
  updateInputValueAndFilter = (event) => {
    let state = this.state
    state[event.target.name] = event.target.value.toLowerCase()

    state.pacienteFiltrados = state.pacientes.filter(paciente => {
      //se o nome digitado corresponder ao de um paciente retorna valor >= 0
      let valor = paciente.nome.toLowerCase().indexOf(state.nomePacienteFiltro)
      if ((valor !== -1 || state.nomePacienteFiltro === '') &&
        (state.tipoInternacaoFiltro === "todos" || state.tipoInternacaoFiltro === paciente.statusPaciente.toLowerCase())) {
        return paciente
      }
      return null;
    })
    this.setState(state)
  }

  render() {
    return (
      <>
        <div className="content">
          <LoadingSpinner visible={this.state.LoadingSpinner} />
          <Card >
            <CardBody>

              <Row >
                <Col className="pr-md-1" md="12">
                  <h3 style={{ fontSize: 25 }}>PACIENTES</h3>
                </Col>
              </Row>

              <Filtros
                tipoInternacao={this.state.tipoInternacaoFiltro}
                nomePaciente={this.state.nomePacienteFiltro}
                toggleFiltro={this.updateInputValueAndFilter}
              />

              <TabelaPacientes
                pacientes={this.state.pacienteFiltrados}
                history={this.props.history}
              />

            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

export default Pacientes;
