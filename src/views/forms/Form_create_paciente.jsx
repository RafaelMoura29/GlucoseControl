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
    CardTitle
} from "reactstrap";

class Form_create_paciente extends React.Component {
    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="7">
                            <Card>
                                <CardHeader>
                                <CardTitle>
                                        <h2 className="title">Cadastrar paciente</h2>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label>Nome leito</label>
                                                    <Input
                                                        placeholder="Nome leito"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label>Unidade</label>
                                                    <Input type="select">
                                                        <option>Nome unidade</option>
                                                        <option>Nome unidade</option>
                                                        <option>Nome unidade</option>
                                                        <option>Nome unidade</option>
                                                        <option>Nome unidade</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label>Ativo</label>
                                                    <Input type="select">
                                                        <option>Disponível</option>
                                                        <option>Reservado</option>
                                                        <option>Ocupado</option>
                                                        <option>Bloqueado</option>
                                                        <option>Inativo</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label>Tipo</label>
                                                    <Input
                                                        placeholder="Tipo"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button className="btn-fill" color="primary" type="submit">
                                        Save
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