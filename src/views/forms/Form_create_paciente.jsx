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
            ModalMessagerText: ''
        };
    };

    togglePlanoAplicacao = () => {
        this.setState({
            modal: !this.state.modal
        });
        console.log(this.state.modal)
    }

    toggleMessager = () => {
        this.setState({
            ModalMessager: !this.state.ModalMessager
        });
    }

    savePaciente = () => {
        this.setState({ LoadingSpinner: true, modal: false, });

        //Verifica preenchimento dos campos
        if (document.getElementById("inputProntuario").value === "" ||
            document.getElementById("inputDataInternacao").value === "" ||
            document.getElementById("inputHoraInternacao").value === "" ||
            document.getElementById("inputNome").value === "" ||
            document.getElementById("inputDataNascimento").value === "" ||
            document.getElementById("inputSexo").value === "" ||
            document.getElementById("inputTipoInternacao").value === "" ||
            document.getElementById("inputObservacoes").value === "" ||
            document.getElementById("inputDiabetes").value === "" ||
            document.getElementById("inputInsuficienciaRenal").value === "" ||
            document.getElementById("inputCorticoide").value === ""
        ) {
            return this.setState({
                LoadingSpinner: false,
                ModalMessager: true,
                ModalMessagerText: 'Preencha todos os campos!'
            });
        }

        let a = document.querySelectorAll(".checkPlano")
        let planoAplicacao = '';
        a.forEach((element, index) => {
            if (element.checked) {
                planoAplicacao = planoAplicacao + (index + 1) + "#"
            }
        })
        planoAplicacao = planoAplicacao.slice(0, -1);
        let d = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        //d.setHours(d.getHours() - 3)
        //Gravando paciente
        axios.post("https://glucosecontrolapp.herokuapp.com/paciente", {
            "prontuario": document.getElementById("inputProntuario").value,
            "nome": document.getElementById("inputNome").value,
            "dataNascimento": document.getElementById("inputDataNascimento").value,
            "tipoInternacao": document.getElementById("inputTipoInternacao").value,
            "diabetes": document.getElementById("inputDiabetes").value,
            "insuficienciaRenal": document.getElementById("inputInsuficienciaRenal").value,
            "corticoide": document.getElementById("inputCorticoide").value,
            "infeccao": document.getElementById("inputInfeccao").checked,
            "sepse": document.getElementById("inputSepse").checked,
            "sindromeDesconfortoRespiratorio": document.getElementById("inputDesconfortoRespiratorio").checked,
            "sexo": document.getElementById("inputSexo").value,
            "dataHoraInternacao": document.getElementById("inputDataInternacao").value + " " + document.getElementById("inputHoraInternacao").value,
            "observacoes": document.getElementById("inputObservacoes").value,
            "estadoPaciente": document.getElementById("inputRadioAlta").checked ? "alta" : "internado",
            "planoAplicacao": planoAplicacao,
            "createDate": d
        })
            .then(response => {
                //Limpando campos
                document.getElementById("inputProntuario").value = ""
                document.getElementById("inputDataInternacao").value = ""
                document.getElementById("inputHoraInternacao").value = ""
                document.getElementById("inputNome").value = ""
                document.getElementById("inputDataNascimento").value = "13/11/2020"
                document.getElementById("inputSexo").value = "Masculino"
                document.getElementById("inputTipoInternacao").value = "Clínica"
                document.getElementById("inputObservacoes").value = ""
                document.getElementById("inputDiabetes").value = "Não se aplica"
                document.getElementById("inputInsuficienciaRenal").value = "Não se aplica"
                document.getElementById("inputCorticoide").value = "Não se aplica"
                a.forEach((element, index) => {
                    element.checked = false
                })
                this.setState({
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
                        toggle={this.togglePlanoAplicacao} />

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
                                                                required
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
                                                                required
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>DATA NASCIMENTO</label>
                                                            <Input
                                                                type="date"
                                                                name="datetime"
                                                                placeholder="datetime placeholder"
                                                                id="inputDataNascimento"
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>SEXO</label>
                                                            <Input type="select" name="select" id="inputSexo">
                                                                <option>Masculino</option>
                                                                <option>Feminino</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>TIPO INTERNAÇÃO</label>
                                                            <Input type="select" name="select" id="inputTipoInternacao">
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
                                                                name="datetime"
                                                                id="exampleDatetime"
                                                                placeholder="datetime placeholder"
                                                                id="inputDataInternacao"
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>HORA INTERNAÇÃO</label>
                                                            <Input
                                                                type="time"
                                                                name="datetime"
                                                                id="inputHoraInternacao"
                                                                placeholder="datetime placeholder"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup check inline className="form-check-radio">
                                                            <Label className="form-check-label">
                                                                <Input type="radio" name="exampleRadios1" id="inputRadioInternado" value="option1" defaultChecked />
                INTERNADO
                <span className="form-check-sign"></span>
                                                            </Label>
                                                        </FormGroup>
                                                        <FormGroup check inline className="form-check-radio">
                                                            <Label className="form-check-label">
                                                                <Input type="radio" name="exampleRadios1" id="inputRadioAlta" value="option2" />
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
                                                    <Input type="select" name="select" id="inputDiabetes">
                                                        <option>Não se aplica</option>
                                                        <option>controle domiciliar dietético</option>
                                                        <option>controle domiciliar com hipoglicemiante oral</option>
                                                        <option>controle domiciliar com insulina</option>
                                                        <option>controle domiciliar medicamentoso misto</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="exampleText">INSUFICIÊNCIA RENAL</Label>
                                                    <Input type="select" name="select" id="inputInsuficienciaRenal">
                                                        <option>Não se aplica</option>
                                                        <option>crônica dialítica</option>
                                                        <option>crônica não dialítica</option>
                                                        <option>aguda dialítica</option>
                                                        <option>aguda não dialítica</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="exampleText">CORTICOIDE</Label>
                                                    <Input type="select" name="select" id="inputCorticoide">
                                                        <option>Não se aplica</option>
                                                        <option>a mais de 7 dias</option>
                                                        <option>menos de 7 dias</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup check>
                                                    <Row>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input className="form-check-input" id="inputInfeccao" type="checkbox" value="" />
                  INFECÇÃO
                  <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input className="form-check-input" id="inputSepse" type="checkbox" value="" />
                  SEPSE
                  <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input className="form-check-input" id="inputDesconfortoRespiratorio" type="checkbox" value="" />
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
                                                    <Input type="textarea" name="text" id="inputObservacoes" />
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