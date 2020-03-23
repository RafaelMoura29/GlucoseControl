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
                                                <FormGroup check>
                                                    <Label className="form-check-label">
                                                        <Input className="form-check-input" type="checkbox" value="" />
                  Check me out
                  <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label className="form-check-label">
                                                        <Input className="form-check-input" type="checkbox" value="" />
                  Check me out
                  <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label className="form-check-label">
                                                        <Input className="form-check-input" type="checkbox" value="" />
                  Check me out
                  <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label className="form-check-label">
                                                        <Input className="form-check-input" type="checkbox" value="" />
                  Check me out
                  <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect1">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleText">Example textarea</Label>
                                                    <Input type="textarea" name="text" id="exampleText" />
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