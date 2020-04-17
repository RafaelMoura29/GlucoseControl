import React from "react";

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
            fade: true
        };
        this.toggle = this.toggle.bind(this);
        this._idPaciente = "";
        this.saveGlicose= this.saveGlicose.bind(this);
    };
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount(){
        const{match:{params}} = this.props;
        this._idPaciente = params._idPaciente;
    }
        saveGlicose() {
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
                "_idPaciente" : this._idPaciente
            })
            .then(response =>{
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
            .catch(error =>{
                alert("Ocorreu um  erro ao tentar gravar os dados. Tente novamente mais tarde!")
            })
        }
    render() {
        return (
            <>
                <div className="content">
                    <div>
                        <Modal isOpen={this.state.modal} fade={this.state.fade} toggle={this.toggle}>
                            <ModalBody style={{ backgroundColor: '#1e1e2f' }}>
                                <h3 className="text-center mb-4">Plano inicial de aplicação</h3>
                                <CardText style={{ color: '#aaa' }}>Plano inicial de aplicações sugeridos pelo sistema.
                                Caso desese alterar selecione os novos hoários e
atualize, caso contrário, basta confirmar.</CardText>
                                <Row className="mb-4">
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 1h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 2h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 2h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>

                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 3h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 4h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 5h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 6h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 7h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 8h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 9h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 10h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 11h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 12h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 13h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 14h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 15h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 16h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 17h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 18h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 19h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 20h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 21h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 22h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 23h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" /> 24h
              <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <Button className="btn-fill" color="info" type="submit" onClick={this.toggle}>
                                        Atualizar
                  </Button>
                                    <Button className="btn-fill" color="success" type="submit">
                                        Confirmar
                  </Button>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
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
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>DATA/HORA</label>
                                                        <Input
                                                            placeholder="Data/Hora"
                                                            type="text"
                                                            id="inputHoraGlicose"
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
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">

                                                    <FormGroup>
                                                        <label>DATA COLETA</label>
                                                        <Input
                                                            placeholder="Data coleta"
                                                            type="text"
                                                            id="inputDataColetaGlicose"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>HORA COLETA</label>
                                                        <Input
                                                            placeholder="Hora coleta"
                                                            type="text"
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
                                <Button className="btn-fill" color="success" type="submit" onClick={this.toggle}>
                                    Plano aplicação
                  </Button>
                                <Button className="btn-fill" color="info" type="submit" onClick={this.saveGlicose}>
                                    Atualizar
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
