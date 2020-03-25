import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardTitle,
    Label,
    Modal,
    ModalBody,
    CardText
} from "reactstrap";

class Form_create_paciente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            fade: true
        };
        this.toggle = this.toggle.bind(this);
    };
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        return (
            <>
                <div className="content">
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
                    <Row>
                        <Col md="12">
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
                                                                placeholder="PRONTUÁRIO"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>DATA/HORA INTERNAÇÃO</label>
                                                            <Input
                                                                placeholder="DATA/HORA INTERNAÇÃO"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="12">
                                                        <FormGroup>
                                                            <label>NOME</label>
                                                            <Input
                                                                placeholder="NOME"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="6">

                                                        <FormGroup>
                                                            <label>DATA NASCIMENTO</label>
                                                            <Input
                                                                placeholder="DATA NASCIMENTO"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>SEXO</label>
                                                            <Input
                                                                placeholder="SEXO"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="12">
                                                        <FormGroup>
                                                            <label>TIPO INTERNAÇÃO</label>
                                                            <Input
                                                                placeholder="TIPO INTERNAÇÃO"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup check inline className="form-check-radio">
                                                            <Label className="form-check-label">
                                                                <Input type="radio" name="exampleRadios1" id="exampleRadios11" value="option1" />
                INTERNADO
                <span className="form-check-sign"></span>
                                                            </Label>
                                                        </FormGroup>
                                                        <FormGroup check inline className="form-check-radio">
                                                            <Label className="form-check-label">
                                                                <Input type="radio" name="exampleRadios1" id="exampleRadios12" value="option2" defaultChecked />
              ALTA
              <span className="form-check-sign"></span>
                                                            </Label>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <Label for="exampleText">OBSERVAÇÕES</Label>
                                                    <Input type="textarea" name="text" id="exampleText" />
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label className="form-check-label mb-1">
                                                        <Input className="form-check-input" type="checkbox" value="" />
                  DIABETES
                  <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        <option></option>
                                                        <option>controle domiciliar dietético</option>
                                                        <option>controle domiciliar com hipoglicemiante oral</option>
                                                        <option>controle domiciliar com insulina</option>
                                                        <option>controle domiciliar medicamentoso misto</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label className="form-check-label mb-1">
                                                        <Input className="form-check-input" type="checkbox" value="" />
                  INSUFICIÊNCIA RENAL
                  <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        Insuficiência Renal
                                                        <option></option>
                                                        <option>crônica dialítica</option>
                                                        <option>crônica não dialítica</option>
                                                        <option>aguda dialítica</option>
                                                        <option>aguda não dialítica</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label className="form-check-label mb-1">
                                                        <Input className="form-check-input" type="checkbox" value="" />
                  CORTICOIDE
                  <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        <option></option>
                                                        <option>a mais de 7 dias</option>
                                                        <option>menos de 7 dias</option>
                                                    </Input>
                                                </FormGroup>
                                                
                                                <FormGroup check>
                                                    <Row>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input className="form-check-input" type="checkbox" value="" />
                  INFECÇÃO
                  <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input className="form-check-input" type="checkbox" value="" />
                  SEPSE
                  <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label className="form-check-label">
                                                                <Input className="form-check-input" type="checkbox" value="" />
                  SÍDROME DE DESCONFORTO RESPIRATÓRIO
                  <span className="form-check-sign">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </Label>
                                                        </Col>
                                                    </Row>

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button className="btn-fill" color="success" type="submit" onClick={this.toggle}>
                                        Plano aplicação
                  </Button>
                                    <Button className="btn-fill" color="info" type="submit">
                                        Atualizar
                  </Button>
                                    <Button className="btn-fill" color="warning" type="submit">
                                        Coletar
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