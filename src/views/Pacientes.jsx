import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner.js'
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

const axios = require("axios");

class Pacientes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1",
            width: 0,
            height: 0,
            pacientes: [],
            pacienteFiltrados: [],
            nomePacienteFiltro: "",
            tipoInternacaoFiltro: "todos",
            LoadingSpinner: false
        };
    }

    formataData(data) {
        let a = data.substring(0, 10).split("-");
        data = a[2] + "/" + a[1] + "/" + a[0];
        return data;
    }

    //Fazendo requisição dos pacientes
    async getPacientes() {
        this.setState({ LoadingSpinner: true });

        axios.get("https://glucosecontrolapp.herokuapp.com/paciente")
            .then(response => {
                response.data.paciente.map(e => (
                    e.dataHoraInternacao = this.formataData(e.dataHoraInternacao)
                ))
                this.setState({
                    pacientes: response.data.paciente,
                    pacienteFiltrados: response.data.paciente
                });
            })
            .finally(() => this.setState({ LoadingSpinner: false }))
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
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
                (state.tipoInternacaoFiltro === "todos" || state.tipoInternacaoFiltro === paciente.estadoPaciente.toLowerCase())) {
                return paciente
            }
            return null;
        })
        this.setState(state)
    }

    //Desativa event listener quando a página é fechada
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    //Atualiza velores da dimensão da tela
    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <>
                <div className="content">
                    <LoadingSpinner visible={this.state.LoadingSpinner} />
                    <Card >
                        <CardBody>
                            <Form className="mb-4">
                                <Row>
                                    <Col className="pr-md-1" md="2">
                                        <FormGroup>
                                            <Input
                                                value={this.state.tipoInternacaoFiltro}
                                                type="select"
                                                name="tipoInternacaoFiltro"
                                                onChange={this.updateInputValueAndFilter}
                                            >
                                                <option style={{backgroundColor:'#27293d'}} value="todos">Todos</option>
                                                <option style={{backgroundColor:'#27293d'}} value="internado">Internado</option>
                                                <option style={{backgroundColor:'#27293d'}} value="alta">Alta</option>
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
                                            <Link to="/admin/form_create_paciente/0">

                                                <Button className="btn-fill" color="info" type="submit">
                                                    NOVO</Button>
                                            </Link>
                                        </Col>
                                        : <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex:1001 }}>
                                            <Link to="/admin/form_create_paciente/0">
                                                <Button size="lg" className="btn-round btn-icon" color="info">
                                                    <i className="tim-icons icon-simple-add" />
                                                </Button>
                                            </Link>
                                        </div>
                                    }
                                </Row>
                            </Form>

                            <Table>
                                <thead>
                                    <tr>
                                        <th></th>

                                        <th>Prontuário</th>
                                        <th>Nome</th>
                                        <th>Data Internação</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {this.state.pacienteFiltrados.map(paciente =>
                                        <tr key={paciente._id}>
                                            <th scope="row" className="text-left">
                                                <Link to={'/admin/form_create_paciente/' + paciente._id}>
                                                    <Button className="btn-icon" color="info" size="sm">
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </Link>
                                            </th>
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
