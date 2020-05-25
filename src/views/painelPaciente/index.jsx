import React from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import './style.css'

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
    Button,
    CardHeader,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import {
    chartExample2,
    lineChart
} from "variables/charts.jsx";

const axios = require('axios');

class PainelPaciente extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            glicemiaEAplicacoes: [],
            glicemiaEAplicacoesFiltrados: [],
            glucosePaciente: [],
            glucosePacienteFiltrado: [],
            filtroDataColeta: 0,
            filtroDataInicial: "2000-03-28",
            filtroDataFinal: new Date(),
            lineChart: lineChart,
            nomePaciente: '',
            tipoInternacaoFiltro: 'Todos'
        };
        this._idPaciente = "";
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this._idPaciente = params._idPaciente;

        //Setando a data atual como data final no filtro do gráfico
        let dateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        let dataAtual = dateTime.split(" ")[0].split("/")
        dataAtual = dataAtual[2] + '-' + dataAtual[1] + '-' + dataAtual[0]
        this.setState({ filtroDataFinal: dataAtual })

        this.getPaciente()
    }

    getPaciente() {
        axios.get("https://glucosecontrolapp.herokuapp.com/paciente?tagId=" + this._idPaciente)
            .then(({ data: { paciente } }) => {
                paciente = paciente[0]
                let glicemias = paciente.glicemia.map((glicemia) => ({ ...glicemia, procedimento: 'Coleta' }))
                let aplicacoes = paciente.aplicacao.map((aplicacao) => ({ ...aplicacao, procedimento: 'Aplicação' }))
                let glicemiaEAplicacoes = glicemias.concat(aplicacoes)
                let dataInternacao = paciente.dataInternacao
                glicemiaEAplicacoes.sort((a, b) => {
                    let auxA = a.procedimento === 'Coleta'
                        ? a.dataColeta + ' ' + a.horaColeta
                        : a.dataAplicacao + ' ' + a.horaAplicacao

                    let auxB = b.procedimento === 'Coleta'
                        ? b.dataColeta + ' ' + b.horaColeta
                        : b.dataAplicacao + ' ' + b.horaAplicacao

                    let dateA = new Date(auxA)
                    let dateB = new Date(auxB)
                    return dateB - dateA
                })
                this.setState({
                    nomePaciente: paciente.nome,
                    filtroDataInicial: dataInternacao,
                    glicemiaEAplicacoes,
                    glicemiaEAplicacoesFiltrados: glicemiaEAplicacoes
                }, this.filtrarEvolucaoGlicemia)
            })
    }

    formataData(data) {
        let a = data.substring(0, 10).split("-");
        return a[2] + "/" + a[1] + "/" + a[0];
    }

    filtrarEvolucaoGlicemia = () => {
        let state = this.state
        let coletas = state.glicemiaEAplicacoes.filter((procedimento) => {
            let data = procedimento.dataColeta || procedimento.dataAplicacao
            return data >= state.filtroDataInicial && data <= state.filtroDataFinal && procedimento.procedimento === 'Coleta'
        }).reverse()
        const dados = coletas.map((coleta) => coleta.valorGlicemia)
        const labels = coletas.map((coleta) => this.formataData(coleta.dataColeta) + ' ' + coleta.horaColeta)
        state.lineChart.dados = dados
        state.lineChart.labels = labels
        this.setState(state)
    }

    /* 
        Filtra listagem de coletas e aplicações
    */
    handleFiltro = () => {
        const dataFiltro = this.state.filtroDataColeta
        const procedimento = this.state.tipoInternacaoFiltro
        const procedimentosFiltrados = this.state.glicemiaEAplicacoes.filter((coletaAplicacao) => {
            let data = coletaAplicacao.dataColeta || coletaAplicacao.dataAplicacao
            return (coletaAplicacao.procedimento === procedimento || procedimento === "Todos") &&
                (dataFiltro === 0 || data === dataFiltro)
        })
        this.setState({ glicemiaEAplicacoesFiltrados: procedimentosFiltrados })
    }

    /* 
        Modifica valor do campo
    */
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    /* 
        Limpa filtros da listagem de coletas e aplicações
    */
    dismissFiltros = () => {
        this.setState({
            filtroDataColeta: 0,
            tipoInternacaoFiltro: 'Todos'
        }, this.handleFiltro)

    }

    render() {
        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody>
                            <Row >
                                <Col className="pr-md-1" md="7">
                                    <h3 style={{fontSize: 25}}>COLETAS e APLICAÇÕES</h3>
                                </Col>

                                <Col className="pr-md-1" style={{textAlign:"right"}} md="5">
                                    <h3 style={{fontSize: 18}}>
                                        {this.state.nomePaciente}
                                    <Link style={{marginRight: 12, marginLeft: 12}} to={'/admin/form_create_paciente/' + this._idPaciente}>
                                        <Button className="btn-icon" color="info" size="sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </Link>
                                    </h3>
                                    
                                </Col>
                            </Row>

                            <Row className="mb-4" style={{display: 'flex', alignItems: 'stretch'}}>
                                <Col md="3">
                                    <FormGroup>
                                        <Input
                                            type="date"
                                            name="filtroDataColeta"
                                            value={this.state.filtroDataColeta}
                                            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="3">

                                    <FormGroup>
                                        <Input
                                            type="select"
                                            name="tipoInternacaoFiltro"
                                            value={this.state.tipoInternacaoFiltro}
                                            onChange={this.handleChange}
                                        >
                                            <option style={{ backgroundColor: '#27293d' }} value="Todos">Todos</option>
                                            <option style={{ backgroundColor: '#27293d' }} value="Coleta">Coleta</option>
                                            <option style={{ backgroundColor: '#27293d' }} value="Aplicação">Aplicação</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md="2">
                                    <Button
                                        onClick={this.handleFiltro}
                                        className="btn-icon"
                                        color="info"
                                        size="sm"
                                    >
                                        <i className="fa fa-search" />
                                    </Button>
                                    <Button onClick={this.dismissFiltros}
                                        className="btn-icon"
                                        color="warning"
                                        size="sm">
                                        <i className="fa fa-times" />
                                    </Button>
                                </Col>

                                <Col md="4" >
                                    <Link style={{float: "right", marginLeft: 12}} to={"/admin/formAplicacao/" + this._idPaciente}>
                                        <Button className="btn-fill" color="success" type="submit">
                                            APLICAR
                                        </Button>
                                    </Link>

                                    <Link style={{float: "right"}} to={"/admin/Form_glicemia/" + this._idPaciente}>
                                        <Button className="btn-fill" color="warning" type="submit">
                                            COLETAR
                                        </Button>
                                    </Link>

                                </Col>
                            </Row>

                            <Row>
                                <Col md="12">

                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Data</th>
                                                <th>Hora</th>
                                                <th>Procedimento</th>
                                                <th>Tipo</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.glicemiaEAplicacoesFiltrados.map((procedimento, index) => (
                                                <tr key={index}>
                                                    <td>{this.formataData(procedimento.dataColeta || procedimento.dataAplicacao)}</td>
                                                    <td>{procedimento.horaColeta || procedimento.horaAplicacao}</td>
                                                    <td>{procedimento.procedimento}</td>
                                                    <td>{procedimento.tipoColeta || procedimento.tipoAplicacao}</td>
                                                    <td>{procedimento.valorGlicemia || procedimento.posologia}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Card className="card-chart">
                        <CardHeader>
                            <CardTitle tag="h3">
                                <i className="fa fa-tint" />{" "}
                                Evolução da glicemia
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Col className="pr-md-1" md="12">
                                <Row>
                                    <Col className="pr-md-1" md="3">


                                        <FormGroup>
                                            <Label>
                                                Data inicial:
                                        </Label>
                                            <Input
                                                type="date"
                                                name="filtroDataInicial"
                                                value={this.state.filtroDataInicial}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-md-1" md="3" >
                                        <FormGroup>
                                            <Label>
                                                Data final:
                                        </Label>
                                            <Row>
                                                <Col className="pr-md-1" md="10">
                                                    <Input
                                                        type="date"
                                                        name="filtroDataFinal"
                                                        value={this.state.filtroDataFinal}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Col className="pr-md-1" md="2">
                                                    <Button
                                                        className="btn-icon"
                                                        color="info"
                                                        size="sm"
                                                        onClick={this.filtrarEvolucaoGlicemia}
                                                    >
                                                        <i className="fa fa-search" />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>

                            <Col className="pr-md-1" md="12">
                                <div className="chart-area">
                                    <Line
                                        data={this.state.lineChart.data}
                                        options={chartExample2.options}
                                    />
                                </div>
                            </Col>

                        </CardBody>
                        <Row
                            style={{ marginBottom: 15, paddingLeft: 15 }}
                        >
                            <Col className="pr-md-1" md="2">
                                <Link
                                    style={{ color: '#ddd' }}
                                    to={{}}
                                    onClick={() => this.props.history.goBack()}
                                >
                                    {"<- Voltar"}
                                </Link>
                            </Col>
                        </Row>
                    </Card>

                </div>
            </>
        );
    }
}

export default PainelPaciente;
