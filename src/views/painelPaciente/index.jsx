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
        let dateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        //Separa data da hora
        dateTime = dateTime.split(" ")
        //Separa mes, dia e ano
        let dataInternacao = dateTime[0].split("/")
        //Ajustando formato da data
        dataInternacao = dataInternacao[2] + "-" + dataInternacao[1] + "-" + dataInternacao[0]

        super(props);
        this.state = {
            width: 0,
            height: 0,
            glucosePaciente: [],
            glucosePacienteFiltrado: [],
            filtroDataColeta: 0,
            filtroDataInicial: "2000-03-28",
            filtroDataFinal: dataInternacao,
            lineChart: lineChart,
            nomePaciente: ''
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this._idPaciente = "";
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const { match: { params } } = this.props;
        this._idPaciente = params._idPaciente;

        //Setando a data atual como data final no filtro do gráfico
        let dateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        let dataAtual = dateTime.split(" ")[0].split("/")
        dataAtual = dataAtual[2] + '-' + dataAtual[1] + '-' + dataAtual[0]
        this.setState({ filtroDataFinal: dataAtual })

        this.getListGlucose();
        this.getPaciente()
    }

    getPaciente() {
        axios.get("https://glucosecontrolapp.herokuapp.com/paciente?tagId=" + this._idPaciente)
            .then((data) => {
                const paciente = data.data.paciente[0]
                let dataInternacao = paciente.dataHoraInternacao.split(" ")[0]
                this.setState({ nomePaciente: paciente.nome, filtroDataInicial: dataInternacao })
            })
    }

    formataData(data) {
        let a = data.substring(0, 10).split("-");
        return a[2] + "/" + a[1] + "/" + a[0];
    }

    async getListGlucose() {

        axios.get("https://glucosecontrolapp.herokuapp.com/glucose?tagId=" + this._idPaciente)
            .then(response => {
                this.setState({
                    glucosePaciente: response.data.glucose,
                    glucosePacienteFiltrado: response.data.glucose
                }, () => {
                    this.filtrarEvolucaoGlicemia()

                })

            })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    setBgChartData = (name) => {
        this.setState({
            bigChartData: name
        });
    };

    filtrarColetas = () => {
        if (this.state.filtroDataColeta !== 0) {
            let pacientesFiltrados = this.state.glucosePaciente.filter(glucose => {
                return glucose.dataColeta === this.state.filtroDataColeta
            })
            this.setState({ glucosePacienteFiltrado: pacientesFiltrados })
        } else {
            this.setState({ glucosePacienteFiltrado: this.state.glucosePaciente })
        }
    }

    filtrarEvolucaoGlicemia = () => {
        let state = this.state

        let glucoseFiltrada = state.glucosePaciente.filter(glucose => {
            return glucose.dataColeta >= state.filtroDataInicial && glucose.dataColeta <= state.filtroDataFinal
        })

        const dadosGlicemia = glucoseFiltrada.map(glucose => glucose.valorGlicemia)
        const labelsColeta = glucoseFiltrada.map(glucose => this.formataData(glucose.dataColeta) + "-" + glucose.horaColeta)
        state.lineChart.dados = dadosGlicemia
        state.lineChart.labels = labelsColeta
        this.setState(state)
    }

    render() {
        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody>
                            <Row>
                                <Col className="pr-md-1" md="7">
                                    <h3 className="title">COLETAS e APLICAÇÕES</h3>
                                </Col>

                                <Col className="pr-md-1" md="5">
                                    <h3 className="title">Coletas de {this.state.nomePaciente}</h3>
                                    <Link to={'/admin/form_create_paciente/' + this._idPaciente}>
                                        <Button className="btn-icon" color="info" size="sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="2">
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
                                        >
                                            <option style={{ backgroundColor: '#27293d' }} value="todos">Todos</option>
                                            <option style={{ backgroundColor: '#27293d' }} value="internado">Internado</option>
                                            <option style={{ backgroundColor: '#27293d' }} value="alta">Alta</option>
                                        </Input>
                                    </FormGroup>
                                </Col>


                                <Col md="2">
                                    <Button onClick={this.filtrarColetas} className="btn-icon" color="info" size="sm">
                                        <i className="fa fa-search" />
                                    </Button>
                                    <Button onClick={() => {
                                        this.setState({ filtroDataColeta: 0 },
                                            () => {
                                                this.filtrarColetas()
                                            })
                                    }}
                                        className="btn-icon"
                                        color="warning"
                                        size="sm">
                                        <i className="fa fa-times" />
                                    </Button>
                                </Col>

                                <Col md="5">

                                    <Link to={"/admin/Form_glicemia/" + this._idPaciente}>
                                        <Button className="btn-fill" color="warning" type="submit">
                                            COLETAR
                                        </Button>
                                    </Link>

                                    <Link to={"/admin/formAplicacao/" + this._idPaciente}>
                                        <Button className="btn-fill" color="success" type="submit">
                                            APLICAR
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
                                                <th>Valor Glicemia</th>
                                                <th>Tipo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.glucosePacienteFiltrado.map(glucose => (
                                                <tr key={glucose._id}>
                                                    <td>{this.formataData(glucose.dataColeta)}</td>
                                                    <td>{glucose.horaColeta}</td>
                                                    <td>{glucose.valorGlicemia}</td>
                                                    <td>{glucose.tipo}</td>
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
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
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
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
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
                    </Card>

                </div>
            </>
        );
    }
}

export default PainelPaciente;
