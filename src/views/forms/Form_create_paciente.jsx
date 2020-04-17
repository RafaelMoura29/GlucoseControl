import React from "react";
import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager.js'
import ModalPlanoAplicacao from '../../components/ModalPlanoAplicacao.js'

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label,
    ModalHeader
} from "reactstrap";

const axios = require('axios');

class Form_create_paciente extends React.Component {
    constructor(props) {
        let dateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        //Separa data da hora
        dateTime = dateTime.split(" ")
        //Separa mes, dia e ano
        let dataInternacao = dateTime[0].split("/")
        //Ajustando formato da data
        dataInternacao = dataInternacao[2] + "-" + dataInternacao[1] + "-" + dataInternacao[0]
        //Hora atual
        let horaInternacao = dateTime[1].substring(0, 5)

        super(props);
        this.state = {
            modal: false,
            fade: true,
            LoadingSpinner: false,
            ModalMessager: false,
            ModalMessagerText: '',
            idPaciente: 0,
            redirectUrl: '',
            form: {
                textBtnRequest: '',
                requestType: '',
                nome: '',
                prontuario: '',
                dataNascimento: '',
                sexo: 'Masculino',
                tipoInternacao: 'Clínica',
                dataInternacao: dataInternacao,
                horaInternacao: horaInternacao,
                internado: true,
                alta: false,
                diabetes: 'Não se aplica',
                insuficienciaRenal: 'Não se aplica',
                corticoide: 'Não se aplica',
                infeccao: false,
                sepse: false,
                sindromeDesconfortoRespiratorio: false,
                observacoes: '',
                planoAplicacao: [
                    false, false, false, false, false, false,
                    false, false, false, false, false, false,
                    false, false, false, false, false, false,
                    false, false, false, false, false, false,
                ]
            }
        }
    }

    componentDidMount() {
        this.setState({ LoadingSpinner: true, modal: false, });
        const { match: { params } } = this.props;
        if (params._idPaciente !== '0') {
            axios.get("https://glucosecontrolapp.herokuapp.com/paciente?tagId=" + params._idPaciente)
                .then(response => {
                    const paciente = response.data.paciente[0]
                    let state = this.state
                    state.idPaciente = paciente._id
                    state.textBtnRequest = 'ATUALIZAR'
                    state.requestType = 'put'
                    state.form.nome = paciente.nome
                    state.form.prontuario = paciente.prontuario
                    state.form.dataNascimento = paciente.dataNascimento
                    state.form.sexo = paciente.sexo
                    state.form.tipoInternacao = paciente.tipoInternacao
                    state.form.dataInternacao = paciente.dataHoraInternacao.substr(0, 10)
                    state.form.horaInternacao = paciente.dataHoraInternacao.substr(11, 14)
                    state.form.internado = paciente.estadoPaciente !== 'alta'
                    state.form.alta = paciente.estadoPaciente === 'alta'
                    state.form.diabetes = paciente.diabetes
                    state.form.insuficienciaRenal = paciente.insuficienciaRenal
                    state.form.corticoide = paciente.corticoide
                    state.form.infeccao = 'true' === paciente.infeccao
                    state.form.sepse = 'true' === paciente.sepse
                    state.form.sindromeDesconfortoRespiratorio = 'true' === paciente.sindromeDesconfortoRespiratorio
                    state.form.observacoes = paciente.observacoes
                    paciente.planoAplicacao.split("#").map(hora => (
                        state.form.planoAplicacao[parseInt(hora) - 1] = true
                    ))
                    this.setState(state)
                })
                .finally(e => {
                    this.setState({ LoadingSpinner: false });
                })
        } else {
            this.setState({
                LoadingSpinner: false,
                textBtnRequest: "SALVAR",
                requestType: 'post'
            });
        }
    }

    togglePlanoAplicacao = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleMessager = () => {
        this.setState({
            ModalMessager: !this.state.ModalMessager
        });
    }

    updateInputValue = (event) => {
        let state = this.state
        state.form[event.target.name] = event.target.value
        this.setState(state)
    }

    updateCheckValue = (event) => {
        let state = this.state
        if (event.target.name === 'alta' || event.target.name === 'internado') {
            state.form.alta = !this.state.form.alta
            state.form.internado = !this.state.form.internado
            this.setState(state)
        } else {
            state.form[event.target.name] = event.target.checked
            this.setState(state)
        }

    }

    updateCheckedAplicacao = (event) => {
        let state = this.state
        state.form.planoAplicacao[event.target.name] = event.target.checked
        this.setState(state)
    }

    savePaciente = (event) => {
        
        let coleta = event.target.name === 'btnColeta'
        let url;
        if (coleta) {
            url = '/admin/Form_glicemia/' + this.state.idPaciente
        } else {
            url = '/admin/pacientes/'
        }
        this.setState({ LoadingSpinner: true, modal: false, redirectUrl: url });
        let form = this.state.form

        //Verifica preenchimento dos campos
        if (
            form.prontuario === "" ||
            form.dataInternacao === "" ||
            form.horaInternacao === "" ||
            form.nome === "" ||
            form.dataNascimento === "" ||
            form.sexo === "" ||
            form.tipoInternacao === "" ||
            form.observacoes === "" ||
            form.diabetes === "" ||
            form.insuficienciaRenal === "" ||
            form.corticoide === ""
        ) {
            return this.setState({
                LoadingSpinner: false,
                ModalMessager: true,
                ModalMessagerText: 'Preencha todos os campos!'
            });
        }

        let planoAplicacao = '';
        form.planoAplicacao.map((element, index) => {
            if (element) {
                return planoAplicacao = planoAplicacao + (index + 1) + "#"
            }
            return null
        })
        planoAplicacao = planoAplicacao.slice(0, -1);

        let dataCriacao = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

        if (this.state.requestType === "post") {
            //Gravando paciente
            axios.post("https://glucosecontrolapp.herokuapp.com/paciente", {
                "prontuario": form.prontuario,
                "nome": form.nome,
                "dataNascimento": form.dataNascimento,
                "tipoInternacao": form.tipoInternacao,
                "diabetes": form.diabetes,
                "insuficienciaRenal": form.insuficienciaRenal,
                "corticoide": form.corticoide,
                "infeccao": form.infeccao,
                "sepse": form.sepse,
                "sindromeDesconfortoRespiratorio": form.sindromeDesconfortoRespiratorio,
                "sexo": form.sexo,
                "dataHoraInternacao": form.dataInternacao + " " + form.horaInternacao,
                "observacoes": form.observacoes,
                "estadoPaciente": form.alta ? "alta" : "internado",
                "planoAplicacao": planoAplicacao,
                "createDate": dataCriacao
            })
                .then(response => {
                    //Limpando campos
                    this.setState({
                        form: {
                            nome: '',
                            prontuario: '',
                            dataNascimento: '',
                            sexo: 'Masculino',
                            tipoInternacao: 'Clínica',
                            dataInternacao: '',
                            horaInternacao: '',
                            internado: true,
                            alta: false,
                            diabetes: 'Não se aplica',
                            insuficienciaRenal: 'Não se aplica',
                            corticoide: 'Não se aplica',
                            infeccao: false,
                            sepse: false,
                            sindromeDesconfortoRespiratorio: false,
                            observacoes: '',
                            planoAplicacao: [
                                false, false, false, false, false, false,
                                false, false, false, false, false, false,
                                false, false, false, false, false, false,
                                false, false, false, false, false, false,
                            ]
                        },
                        LoadingSpinner: false,
                        ModalMessager: true,
                        ModalMessagerText: 'Dados Gravados com sucesso'
                    });
                    
                })
                .catch(error => {
                    this.setState({
                        LoadingSpinner: false,
                        ModalMessager: true,
                        ModalMessagerText: 'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
                    });
                })
        } else {
            axios.put("https://glucosecontrolapp.herokuapp.com/paciente",
                {
                    "_id": this.state.idPaciente,
                    "dataUpdated": {
                        "prontuario": form.prontuario,
                        "nome": form.nome,
                        "dataNascimento": form.dataNascimento,
                        "tipoInternacao": form.tipoInternacao,
                        "diabetes": form.diabetes,
                        "insuficienciaRenal": form.insuficienciaRenal,
                        "corticoide": form.corticoide,
                        "infeccao": form.infeccao,
                        "sepse": form.sepse,
                        "sindromeDesconfortoRespiratorio": form.sindromeDesconfortoRespiratorio,
                        "sexo": form.sexo,
                        "dataHoraInternacao": form.dataInternacao + " " + form.horaInternacao,
                        "observacoes": form.observacoes,
                        "estadoPaciente": form.alta ? "alta" : "internado",
                        "planoAplicacao": planoAplicacao,
                        "createDate": dataCriacao
                    }
                }
            ).then(response => {
                //Limpando campos
                this.setState({
                    requestType: 'post',
                    form: {
                        nome: '',
                        prontuario: '',
                        dataNascimento: '',
                        sexo: 'Masculino',
                        tipoInternacao: 'Clínica',
                        dataInternacao: '',
                        horaInternacao: '',
                        internado: true,
                        alta: false,
                        diabetes: 'Não se aplica',
                        insuficienciaRenal: 'Não se aplica',
                        corticoide: 'Não se aplica',
                        infeccao: false,
                        sepse: false,
                        sindromeDesconfortoRespiratorio: false,
                        observacoes: '',
                        planoAplicacao: [
                            false, false, false, false, false, false,
                            false, false, false, false, false, false,
                            false, false, false, false, false, false,
                            false, false, false, false, false, false,
                        ]
                    },
                    LoadingSpinner: false,
                    ModalMessager: true,
                    ModalMessagerText: 'Dados Gravados com sucesso'
                });
                
            })
                .catch(error => {
                    this.setState({
                        LoadingSpinner: false,
                        ModalMessager: true,
                        ModalMessagerText: 'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
                    });
                })
        }
        //document.location.href = '/admin/pacientes/';
    }
    render() {
        return (
            <>
                <div className="content">
                    <LoadingSpinner visible={this.state.LoadingSpinner} />

                    <ModalMessager 
                        visible={this.state.ModalMessager} 
                        text={this.state.ModalMessagerText}
                        toggle={() => document.location.href = this.state.redirectUrl}
                        >
                        <ModalHeader toggle={this.toggleMessager}></ModalHeader>
                    </ModalMessager>

                    <ModalPlanoAplicacao
                        modal={this.state.modal}
                        click={this.savePaciente}
                        clickColeta={this.savePaciente}
                        toggle={this.togglePlanoAplicacao}
                        planoAplicacao={this.state.form.planoAplicacao}
                        planoAplicacaoChange={this.updateCheckedAplicacao}
                        textBtn={this.state.textBtnRequest}
                    />

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col className="pr-md-1" md="6">
                                                <Row>

                                                    <Col className="pr-md-1" md="12">
                                                        <FormGroup>
                                                            <label>NOME</label>
                                                            <Input
                                                                placeholder="NOME"
                                                                type="text"
                                                                name="nome"
                                                                onChange={this.updateInputValue}
                                                                value={this.state.form.nome}
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>PRONTUÁRIO</label>
                                                            <Input
                                                                placeholder="PRONTUÁRIO"
                                                                type="text"
                                                                name="prontuario"
                                                                onChange={this.updateInputValue}
                                                                value={this.state.form.prontuario}
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>DATA NASCIMENTO</label>
                                                            <Input
                                                                type="date"
                                                                name="dataNascimento"
                                                                placeholder="datetime placeholder"
                                                                onChange={this.updateInputValue}
                                                                value={this.state.form.dataNascimento}
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>SEXO</label>
                                                            <Input
                                                                name="sexo"
                                                                type="select"
                                                                onChange={this.updateInputValue}
                                                                value={this.state.form.sexo}>
                                                                <option>Masculino</option>
                                                                <option>Feminino</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>TIPO INTERNAÇÃO</label>
                                                            <Input
                                                                type="select"
                                                                name="tipoInternacao"
                                                                onChange={this.updateInputValue}
                                                                value={this.state.form.tipoInternacao}>
                                                                <option>clínica</option>
                                                                <option>cirurgica de urgência</option>
                                                                <option>cirurgica eletiva</option>
                                                                <option>sindorme coronariana aguda</option>
                                                                <option>acidente vascular encefálico</option>
                                                                <option>trauma</option>
                                                                <option>oncológica</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>DATA INTERNAÇÃO</label>
                                                            <Input
                                                                type="date"
                                                                name="dataInternacao"
                                                                placeholder="datetime placeholder"
                                                                onChange={this.updateInputValue}
                                                                value={this.state.form.dataInternacao}
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>HORA INTERNAÇÃO</label>
                                                            <Input
                                                                type="time"
                                                                name="horaInternacao"
                                                                placeholder="datetime placeholder"
                                                                onChange={this.updateInputValue}
                                                                value={this.state.form.horaInternacao}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup check inline className="form-check-radio">
                                                            <Label className="form-check-label">
                                                                <Input
                                                                    type="radio"
                                                                    name="internado"
                                                                    onChange={this.updateCheckValue}
                                                                    checked={this.state.form.internado}
                                                                />
                                                                    INTERNADO
                                                                    <span className="form-check-sign" />
                                                            </Label>
                                                        </FormGroup>
                                                        <FormGroup check inline className="form-check-radio">
                                                            <Label className="form-check-label">
                                                                <Input
                                                                    type="radio"
                                                                    name="alta"
                                                                    onChange={this.updateCheckValue}
                                                                    checked={this.state.form.alta} />
                                                                    ALTA
                                                                    <span className="form-check-sign"></span>
                                                            </Label>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <Label for="exampleText">DIABETES</Label>
                                                    <Input
                                                        type="select"
                                                        name="diabetes"
                                                        onChange={this.updateInputValue}
                                                        value={this.state.form.diabetes}>
                                                        <option>Não se aplica</option>
                                                        <option>controle domiciliar dietético</option>
                                                        <option>controle domiciliar com hipoglicemiante oral</option>
                                                        <option>controle domiciliar com insulina</option>
                                                        <option>controle domiciliar medicamentoso misto</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="exampleText">INSUFICIÊNCIA RENAL</Label>
                                                    <Input
                                                        type="select"
                                                        name="insuficienciaRenal"
                                                        onChange={this.updateInputValue}
                                                        value={this.state.form.insuficienciaRenal}
                                                    >
                                                        <option>Não se aplica</option>
                                                        <option>crônica dialítica</option>
                                                        <option>crônica não dialítica</option>
                                                        <option>aguda dialítica</option>
                                                        <option>aguda não dialítica</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="exampleText">CORTICOIDE</Label>
                                                    <Input
                                                        type="select"
                                                        name="corticoide"
                                                        onChange={this.updateInputValue}
                                                        value={this.state.form.corticoide}
                                                    >
                                                        <option>Não se aplica</option>
                                                        <option>a mais de 7 dias</option>
                                                        <option>menos de 7 dias</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup check>
                                                    <Row>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input
                                                                    className="form-check-input"
                                                                    name="infeccao"
                                                                    type="checkbox"
                                                                    onChange={this.updateCheckValue}
                                                                    checked={this.state.form.infeccao}
                                                                />
                                                                    INFECÇÃO
                                                                    <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input
                                                                    className="form-check-input"
                                                                    name="sepse"
                                                                    type="checkbox"
                                                                    onChange={this.updateCheckValue}
                                                                    checked={this.state.form.sepse}
                                                                />
                                                                    SEPSE
                                                                    <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input
                                                                    className="form-check-input"
                                                                    name="sindromeDesconfortoRespiratorio"
                                                                    type="checkbox"
                                                                    onChange={this.updateCheckValue}
                                                                    checked={this.state.form.sindromeDesconfortoRespiratorio}
                                                                />
                                                                    SÍDROME DE DESCONFORTO RESPIRATÓRIO
                                                                    <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="exampleText">OBSERVAÇÕES</Label>
                                                    <Input
                                                        type="textarea"
                                                        name="observacoes"
                                                        onChange={this.updateInputValue}
                                                        value={this.state.form.observacoes}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button className="btn-fill" color="info" type="submit" onClick={this.togglePlanoAplicacao}>
                                        PLANO COLETA
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </>
        );
    }
}

export default Form_create_paciente;