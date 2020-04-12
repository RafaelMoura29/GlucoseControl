/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Table,
    Card,
    CardBody
} from "reactstrap";

const axios = require('axios');

class Pacientes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1",
            width: 0,
            height: 0,
            pacientes: [],
            pacienteFiltrados: [],
            nomePacienteFiltro: '',
            tipoInternacaoFiltro: 'todos'
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateInputValueAndFilter = this.updateInputValueAndFilter.bind(this);
    }

    //Fazendo requisição dos pacientes
    async getPacientes() {
        axios.get("https://glucosecontrolapp.herokuapp.com/paciente")
            .then(response => {
                this.setState({
                    pacientes: response.data.paciente,
                    pacienteFiltrados: response.data.paciente
                });
            })
    }

    //Função executada depois da renderização.
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.getPacientes()
    }

    //Atualiza o state do filtro e filtra os pacientes
    updateInputValueAndFilter(event) {
        let state = this.state
        state[event.target.name] = event.target.value.toLowerCase()

        state.pacienteFiltrados = this.state.pacientes.filter(paciente => {
            //Verificando se essa string está dentro do nome do paciente, caso esteja retorna a localização na string
            let valor = paciente.nome.toLowerCase().indexOf(this.state.nomePacienteFiltro)
            if ((valor !== -1 || this.state.nomePacienteFiltro === '') &&
                (this.state.tipoInternacaoFiltro === "todos" || this.state.tipoInternacaoFiltro === paciente.estadoPaciente.toLowerCase())) {
                return paciente
            }
        })
        this.setState(state)
    }

    //Aciona a atualização do tamanho das telas
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    //Atualiza velores da dimensão da tela
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    //Recarrega o state dos pacientes para disparar a atualização da lista de pacientes
    updatePacientes = () => {
        this.setState({ pacientes: this.state.pacientes });
    }

    render() {

        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="2">
                                        <FormGroup>
                                            <Input
                                                value={this.state.tipoInternacaoFiltro}
                                                type="select"
                                                name="tipoInternacaoFiltro"
                                                onChange={this.updateInputValueAndFilter}
                                            >
                                                <option>Todos</option>
                                                <option>Internado</option>
                                                <option>Alta</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-md-1" md="5">
                                        <FormGroup >
                                            <Input
                                                name="nomePacienteFiltro"
                                                placeholder="Paciente"
                                                type="text"
                                                onChange={this.updateInputValueAndFilter}
                                                value={this.state.nomePacienteFiltro}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3"></Col>
                                    {/* Renderiza o botão personalizado add paciente de acordo com o tamanho da tela. */}
                                    {this.state.width > 910
                                        ? <Col className="pr-md-1" md="2">
                                            <Link to="/admin/form_create_paciente">

                                                <Button className="btn-fill" color="info" type="submit">
                                                    Novo</Button>
                                            </Link>
                                        </Col>
                                        : <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
                                            <Link to="/admin/form_create_paciente">
                                                <Button size="lg" className="btn-round btn-icon" color="info">
                                                    <i className="tim-icons icon-simple-add" />
                                                </Button>
                                            </Link>
                                        </div>
                                    }
                                </Row>
                            </Form>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Prontuário</th>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {this.state.pacienteFiltrados.map(paciente =>
                                        <tr key={paciente._id}>
                                            <td>{paciente.prontuario}</td>
                                            <td>{paciente.nome}</td>
                                            <td>{paciente.dataHoraInternacao}</td>
                                            <th scope="row" className="text-right">
                                                <Link to={'/admin/PainelPaciente/' + paciente._id}>
                                                    <Button className="btn-icon" color="danger" size="sm">
                                                        <i className="fa fa-tint"></i>
                                                    </Button>
                                                </Link>
                                            </th>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                </div>
            </>
        );
    }
}

export default Pacientes;
