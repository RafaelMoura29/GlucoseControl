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
        super(props);
        this.state = {
            modal: false,
            fade: true,
            LoadingSpinner: false,
            ModalMessager: false,
            ModalMessagerText: '',
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
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                ]
            }
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
        state.form[event.target.name] = event.target.checked
        this.setState(state)
    }

    updateCheckedAplicacao = (event) => {
        let state = this.state
        state.form.planoAplicacao[event.target.name] = event.target.checked
        this.setState(state)
    }

    savePaciente = () => {
        this.setState({ LoadingSpinner: true, modal: false, });
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
            if (element) planoAplicacao = planoAplicacao + (index + 1) + "#"
        })
        planoAplicacao = planoAplicacao.slice(0, -1);

        let dataCriacao = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

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
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
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
    render() {
        return (
            <>
                <div className="content">
                    <LoadingSpinner visible={this.state.LoadingSpinner} />

                    <ModalMessager visible={this.state.ModalMessager} text={this.state.ModalMessagerText} >
                        <ModalHeader toggle={this.toggleMessager}></ModalHeader>
                    </ModalMessager>

                    <ModalPlanoAplicacao
                        modal={this.state.modal}
                        click={this.savePaciente}
                        toggle={this.togglePlanoAplicacao}
                        planoAplicacao={this.state.form.planoAplicacao}
                        planoAplicacaoChange={this.updateCheckedAplicacao}
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
                                                                id="inputNome"
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
                                                                id="inputProntuario"
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
                                                                id="inputDataNascimento"
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
                                                                id="inputSexo"
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
                                                                id="inputTipoInternacao"
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
                                                                id="inputDataInternacao"
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
                                                                id="inputHoraInternacao"
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
                                                                    id="inputRadioInternado"
                                                                    onChange={this.updateInputValue}
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
                                                                    id="inputRadioAlta"
                                                                    onChange={this.updateInputValue}
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
                                                        id="inputDiabetes"
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
                                                        id="inputInsuficienciaRenal"
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
                                                        id="inputCorticoide"
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
                                                                    id="inputInfeccao"
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
                                                                    id="inputSepse"
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
                                                                    id="inputDesconfortoRespiratorio"
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
                                                        id="inputObservacoes"
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
                                        Plano aplicação
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