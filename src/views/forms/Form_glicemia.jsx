import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardTitle, 
    Label
} from "reactstrap";

class Form_glicemia extends React.Component {
    render() {
        return (
            <>
                <div className="content">
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
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>DATA/HORA</label>
                                                        <Input
                                                            placeholder="Data/Hora"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>PACIENTE</label>
                                                        <Input
                                                            placeholder="Paciente"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">

                                                    <FormGroup>
                                                        <label>DATA COLETA</label>
                                                        <Input
                                                            placeholder="Data coleta"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>HORA COLETA</label>
                                                        <Input
                                                            placeholder="Hora coleta"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>VALOR GLICEMIA</label>
                                                        <Input
                                                            placeholder="valor glicemia"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="pr-md-1" md="6">

                                            <FormGroup>
                                                <label>TIPO</label>
                                                <Input type="select" name="select" id="exampleSelect1">
                                                        <option>Capilar</option>
                                                        <option>Bioquímica</option>
                                                    </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>TIPO ALIMENTAÇÃO</label>
                                                    <Input type="select" name="select" id="exampleSelect1">
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
                                                <Input type="textarea" name="text" id="exampleText" placeholder="Observações"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                            <Button className="btn-fill" color="success" type="submit">
                                    Plano aplic.
                  </Button>
                  <Button className="btn-fill" color="info" type="submit">
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