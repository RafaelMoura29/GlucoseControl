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
                                                <label>PRONTUARIO</label>
                                                <Input
                                                    placeholder="Tipo"
                                                    type="text"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label>PRONTUARIO</label>
                                                <Input
                                                    placeholder="Tipo"
                                                    type="text"
                                                />
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
                                <Button className="btn-fill" color="primary" type="submit">
                                    Save
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