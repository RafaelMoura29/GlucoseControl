/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { NavLink, Link } from "react-router-dom";
// reactstrap components
import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Table,
    Card,
    CardBody
} from "reactstrap";

const axios = require('axios');

class Pacientes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1",
            width: 0,
            height: 0,
            pacientes: [],
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    async getPacientes() {
        axios.get("https://glucosecontrolapp.herokuapp.com/paciente")
            .then(response => {
                this.setState({ pacientes: response.data.paciente });
            })
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.getPacientes()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    setBgChartData = name => {
        this.setState({
            bigChartData: name
        });
    };

    updatePacientes=()=>{
        this.setState({ pacientes: this.state.pacientes });
    }

    render() {
        let pacientes = this.state.pacientes.filter(paciente =>{
            let filtroNome = document.getElementById('inputNomePaciente').value.toLowerCase()
            let valor = paciente.nome.toLowerCase().indexOf(filtroNome) 
            let filtroTipoInternacao = document.getElementById("selectTipoInternacao").value.toLowerCase()
            console.log(filtroTipoInternacao)
            if ((valor !== -1 || filtroNome === '') && 
                (filtroTipoInternacao === "todos" || filtroTipoInternacao === paciente.estadoPaciente.toLowerCase())) {
                return paciente
            }
        })
        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody>

                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="2">
                                        <FormGroup>
                                            <Input type="select" name="select" id="selectTipoInternacao">
                                                <option>Todos</option>
                                                <option>Internado</option>
                                                <option>Alta</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-md-1" md="5">
                                        <FormGroup >
                                            <Input
                                                placeholder="Paciente"
                                                type="text"
                                                id="inputNomePaciente"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3">
                                        <Button onClick={this.updatePacientes} className="btn-icon" color="info" size="sm">
                                            <i className="fa fa-search"></i>
                                        </Button>
                                    </Col>
                                    {this.state.width > 910
                                        ? <Col className="pr-md-1" md="2">
                                            <Link to="/admin/form_create_paciente">

                                                <Button className="btn-fill" color="success" type="submit">
                                                    Novo</Button>
                                            </Link>
                                        </Col>
                                        : <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
                                            <Link to="/admin/form_create_paciente">
                                                <Button size="lg" className="btn-round btn-icon" color="info">
                                                    <i className="tim-icons icon-simple-add" />
                                                </Button>
                                            </Link>
                                        </div>
                                    }
                                </Row>
                            </Form>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Prontuário</th>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {pacientes.map(paciente =>
                                        <tr key={paciente._id}>
                                            <td>{paciente.prontuario}</td>
                                            <td>{paciente.nome}</td>
                                            <td>{paciente.dataHoraInternacao}</td>
                                            <th scope="row" className="text-right">
                                                <Link to={'/admin/PainelPaciente/' + paciente._id}>
                                                    <Button className="btn-icon" color="danger" size="sm">
                                                        <i className="fa fa-tint"></i>
                                                    </Button>
                                                </Link>
                                            </th>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                </div>
            </>
        );
    }
}

export default Pacientes;
