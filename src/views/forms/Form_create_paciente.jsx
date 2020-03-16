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
    Label
} from "reactstrap";

class Form_create_paciente extends React.Component {
    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <h2 className="title">Cadastrar paciente</h2>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col className="pr-md-1" md="6">
                                                <Row>
                                                    <Col className="pr-md-1" md="6">

                                                        <FormGroup>
                                                            <label>PRONTUARIO</label>
                                                            <Input
                                                                placeholder="Tipo"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>PRONTUARIO</label>
                                                            <Input
                                                                placeholder="Tipo"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>PRONTUARIO</label>
                                                        <Input
                                                            placeholder="Tipo"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-md-1" md="6">

                                                        <FormGroup>
                                                            <label>PRONTUARIO</label>
                                                            <Input
                                                                placeholder="Tipo"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="6">
                                                        <FormGroup>
                                                            <label>PRONTUARIO</label>
                                                            <Input
                                                                placeholder="Tipo"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>PRONTUARIO</label>
                                                        <Input
                                                            placeholder="Tipo"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                </Row>
                                                
                                            </Col>


                                            <Col className="pr-md-1" md="6">
                                                <FormGroup>
                                                    <Label for="exampleText">Example textarea</Label>
                                                    <Input type="textarea" name="text" id="exampleText" />
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