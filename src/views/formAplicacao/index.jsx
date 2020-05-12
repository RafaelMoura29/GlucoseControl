import React from "react";
import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager.js'
import './style.css'

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    Label,
    CardFooter,
    ModalHeader,
    Form
} from "reactstrap";

const axios = require('axios');

class FormAplicacao extends React.Component {

    constructor(props) {
        super()
        this.state = {
            form: {

            }
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this._idPaciente = params._idPaciente;
    }

    render() {
        return (
            <>
                <div className="content">
                    <ModalMessager
                        visible={this.state.ModalMessager}
                        text={this.state.ModalMessagerText}
                        toggle={() => {

                            this.setState({
                                ModalMessager: false,
                            });
                        }}
                    >
                        <ModalHeader toggle={this.toggleMessager}></ModalHeader>
                    </ModalMessager>

                    <LoadingSpinner visible={this.state.LoadingSpinner} />
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
                                                            name="prontuario"
                                                            value={this.state.form.prontuario}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>DATA e HORA INTERNAÇÃO</label>
                                                        <Input
                                                            placeholder="Data/Hora"
                                                            type="text"
                                                            name="dataHoraInternacao"
                                                            value={this.state.form.dataHoraInternacao}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>PACIENTE</label>
                                                        <Input
                                                            placeholder="Paciente"
                                                            type="text"
                                                            name="paciente"
                                                            value={this.state.form.paciente}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>DATA APLICAÇÃO</label>
                                                        <Input
                                                            type="date"
                                                            placeholder="Data Aplicação"
                                                            value={this.state.form.dataAplicacao}
                                                            onChange={this.handleChange}
                                                            name="dataAplicacao"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col className="pr-md-1" md="6">
                                                    <FormGroup>
                                                        <label>HORA APLICAÇÃO</label>
                                                        <Input
                                                            placeholder="Hora Aplicação"
                                                            type="time"
                                                            name="horaAplicacao"
                                                            value={this.state.form.horaAplicacao}
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col className="pr-md-1" md="12">
                                                    <FormGroup>
                                                        <label>TIPO APLICAÇÃO</label>
                                                        <Input
                                                            type="select"
                                                            name="tipoAplicacao"
                                                            value={this.state.form.tipoAplicacao}
                                                            onChange={this.handleChange}
                                                        >
                                                        </Input>
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                        </Col>

                                        <Col className="pr-md-1" md="6">

                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label>VIA ADMINISTRAÇÃO</label>
                                                    <Input
                                                        type="select"
                                                        name="tipoAplicacao"
                                                        value={this.state.form.tipoAplicacao}
                                                        onChange={this.handleChange}
                                                    >
                                                    </Input>
                                                </FormGroup>
                                            </Col>

                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label>DROGA</label>
                                                    <Input
                                                        type="select"
                                                        name="tipoAplicacao"
                                                        value={this.state.form.tipoAplicacao}
                                                        onChange={this.handleChange}
                                                    >
                                                    </Input>
                                                </FormGroup>
                                            </Col>

                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label>POSOLOGIA</label>
                                                    <Input
                                                        placeholder="Posologia"
                                                        type="text"
                                                        name="posologia"
                                                        value={this.state.form.posologia}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <Label for="exampleText">Observações</Label>
                                                    <Input
                                                        type="textarea"
                                                        name="observacoes"
                                                        placeholder="Observações"
                                                        value={this.state.form.observacoes}
                                                        onChange={this.handleChange}
                                                    />
                                                </FormGroup>
                                            </Col>

                                        </Col>

                                    </Row>
                                </Form>
                            </CardBody>

                            <CardFooter>
                                <Button className="btn-fill" color="info" type="submit" onClick={this.saveGlicose}>
                                    SALVAR GLICEMIA
                                </Button>
                            </CardFooter>

                        </Card>
                    </Row>
                </div>
            </>
        );
    }
}

export default FormAplicacao;
