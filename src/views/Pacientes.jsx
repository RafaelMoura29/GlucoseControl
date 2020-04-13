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
            tipoInternacaoFiltro: 'todos',
            LoadingSpinner: false
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateInputValueAndFilter = this.updateInputValueAndFilter.bind(this);
    }

    formataData(data){
        let a = data.substring(0,10).split('-')
        data = a[2] + "/" + a[1] + "/" + a[0]
        return data
    }

    //Fazendo requisição dos pacientes
    async getPacientes() {
        this.setState({LoadingSpinner: true});
        
        axios.get("https://glucosecontrolapp.herokuapp.com/paciente")
            .then(response => {
                response.data.paciente.map(e => {
                    e.dataHoraInternacao = this.formataData(e.dataHoraInternacao)
                })
                this.setState({
                    pacientes: response.data.paciente,
                    pacienteFiltrados: response.data.paciente
                });
            })
            .finally( () => {
                this.setState({LoadingSpinner: false});
            } )
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

    render() {

        return (
            <>
                <div className="content">
                <LoadingSpinner visible={this.state.LoadingSpinner}/>
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
                                        <th>Data Internação</th>
                                        <th>Prontuário</th>
                                        <th>Nome</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {this.state.pacienteFiltrados.map(paciente =>
                                        <tr key={paciente._id}>
                                            <td>{paciente.dataHoraInternacao}</td>
                                            <td>{paciente.prontuario}</td>
                                            <td>{paciente.nome}</td>
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
