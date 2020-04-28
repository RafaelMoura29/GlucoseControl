import React from "react";

import LoadingSpinner from '../../components/LoadingSpinner.js'

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label,
    Modal,
    ModalBody,
} from "reactstrap";

const axios = require('axios');

class Form_glicemia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            fade: true,
            LoadingSpinner: false
        };
        this.toggle = this.toggle.bind(this);
        this._idPaciente = "";
        this.saveGlicose = this.saveGlicose.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this._idPaciente = params._idPaciente;
        this.getPaciente()
    }

    formataDataHora(data) {
        let dataHora = data.split(" ");
        console.log(dataHora)
        console.log(data)
        let hora = dataHora[1]
        let dataFormatada = dataHora[0]
        dataFormatada = dataFormatada.substring(0, 10).split("-");
        dataFormatada = dataFormatada[2] + "/" + dataFormatada[1] + "/" + dataFormatada[0] + " " + hora;
        return dataFormatada;
    }

    getPaciente = () => {
        axios.get("https://glucosecontrolapp.herokuapp.com/paciente?tagId=" + this._idPaciente )
            .then( (response) => {
                const paciente = response.data.paciente[0]
                console.log(response.data.paciente[0])
                document.getElementById("inputProntuarioGlicose").value = paciente.prontuario
                document.getElementById("inputPacienteGlicose").value = paciente.nome
                document.getElementById("inputHoraGlicose").value = this.formataDataHora(paciente.dataHoraInternacao)
            })

    }

    saveGlicose() {
        this.setState({ LoadingSpinner: true });

        if (document.getElementById("inputProntuarioGlicose").value === "" ||
            document.getElementById("inputHoraGlicose").value === "" ||
            document.getElementById("inputPacienteGlicose").value === "" ||
            document.getElementById("inputDataColetaGlicose").value === "" ||
            document.getElementById("inputHoraColetaGlicose").value === "" ||
            document.getElementById("inputValorGlicemiaGlicose").value === "" ||
            document.getElementById("inputTipoGlicose").value === "" ||
            document.getElementById("inputTipoAlimentacaoGlicose").value === "" ||
            document.getElementById("inputObservacoesGlicose").value === ""
        ) {
            this.setState({ LoadingSpinner: false });
            return alert("Preencha todos os campos!")
        }
        axios.post("https://glucosecontrolapp.herokuapp.com/glucose", {
            "prontuario": document.getElementById("inputProntuarioGlicose").value,
            "paciente": document.getElementById("inputPacienteGlicose").value,
            "dataColeta": document.getElementById("inputDataColetaGlicose").value,
            "valorGlicemia": document.getElementById("inputValorGlicemiaGlicose").value,
            "tipo": document.getElementById("inputTipoGlicose").value,
            "tipoAlimentacao": document.getElementById("inputTipoAlimentacaoGlicose").value,
            "hora": document.getElementById("inputHoraGlicose").value,
            "horaColeta": document.getElementById("inputHoraColetaGlicose").value,
            "observacoes": document.getElementById("inputObservacoesGlicose").value,
            "_idPaciente": this._idPaciente
        })
            .then(response => {
                document.getElementById("inputProntuarioGlicose").value = ""
                document.getElementById("inputPacienteGlicose").value = ""
                document.getElementById("inputHoraGlicose").value = ""
                document.getElementById("inputPacienteGlicose").value = ""
                document.getElementById("inputDataColetaGlicose").value = ""
                document.getElementById("inputHoraColetaGlicose").value = ""
                document.getElementById("inputValorGlicemiaGlicose").value = ""
                document.getElementById("inputTipoGlicose").value = ""
                document.getElementById("inputTipoAlimentacaoGlicose").value = ""
                document.getElementById("inputObservacoesGlicose").value = ""
                alert("Dados Gravados com sucesso")
            })
            .catch(error => {
                alert("Ocorreu um  erro ao tentar gravar os dados. Tente novamente mais tarde!")
            })
            .finally(e => {
                this.setState({ LoadingSpinner: false });
            })
    }
    render() {
        return (
            <>
                <div className="content">
                    <LoadingSpinner visible={this.state.LoadingSpinner} />
                    <Row>

                        <Card>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <Row>
                                                <Col className="pr-md-1" md="6">

                                                    <FormGroup>
                                                        <label>PRONTUÁRIO</label>
                                                        <Input
                                                            placeholder="Prontuário"
                                                            type="text"
                                                            id="inputProntuarioGlicose"
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>DATA e HORA INTERNAÇÃO</label>
                                                        <Input
                                                            placeholder="Data/Hora"
                                                            type="text"
                                                            id="inputHoraGlicose"
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>PACIENTE</label>
                                                        <Input
                                                            placeholder="Paciente"
                                                            type="text"
                                                            id="inputPacienteGlicose"
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">

                                                    <FormGroup>
                                                        <label>DATA COLETA</label>
                                                        <Input
                                                            type="date"
                                                            placeholder="Data coleta"
                                                            id="inputDataColetaGlicose"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>HORA COLETA</label>
                                                        <Input
                                                            placeholder="Hora coleta"
                                                            type="time"
                                                            id="inputHoraColetaGlicose"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>VALOR GLICEMIA</label>
                                                        <Input
                                                            placeholder="valor glicemia"
                                                            type="text"
                                                            id="inputValorGlicemiaGlicose"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="pr-md-1" md="6">

                                            <FormGroup>
                                                <label>TIPO</label>
                                                <Input type="select" name="select" id="inputTipoGlicose">
                                                    <option>Capilar</option>
                                                    <option>Bioquímica</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>TIPO ALIMENTAÇÃO</label>
                                                <Input type="select" name="select" id="inputTipoAlimentacaoGlicose">
                                                    <option>Zero</option>
                                                    <option>Oral líquida</option>
                                                    <option>Oral pastosa</option>
                                                    <option>Oral completa</option>
                                                    <option>Interal intermitente</option>
                                                    <option>Interal contínua</option>
                                                    <option>Parenteral</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText">Observações</Label>
                                                <Input type="textarea" name="text" id="inputObservacoesGlicose" placeholder="Observações" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-fill" color="info" type="submit" onClick={this.saveGlicose}>
                                    SALVAR GLICEMIA
                                </Button>
                            </CardFooter>
                        </Card>
                    </Row>
                </div>
            </>
        );
    }
}

export default Form_glicemia;
