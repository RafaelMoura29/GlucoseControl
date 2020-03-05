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
                                                    <label>PRONTUARIO</label>
                                                    <Input
                                                        placeholder="Tipo"
                                                        type="text"
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <label>NOME</label>
                                                    <Input
                                                        placeholder="Tipo"
                                                        type="text"
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <label>NASCIMENTO</label>
                                                    <Input
                                                        placeholder="Tipo"
                                                        type="date"
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <label>SEXO</label>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        <option>Masculino</option>
                                                        <option>Feminino</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup>
                                                    <label>CPF</label>
                                                    <Input
                                                        placeholder="Tipo"
                                                        type="text"
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <label>TAGS</label>
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