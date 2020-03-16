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
import React from "react";
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

class Pacientes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1"
        };
    }
    setBgChartData = name => {
        this.setState({
            bigChartData: name
        });
    };
    render() {
        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="5">
                                        <FormGroup>
                                            <Input
                                                placeholder="Paciente"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col className="pr-md-1" md="7">
                                        <NavLink
                                            to={'/admin/Form_create_paciente'}
                                        >
                                            <Button color="success" style={{ float: 'right' }} className="animation-on-hover">
                                                Novo
                                </Button>
                                        </NavLink>

                                    </Col>

                                </Row>
                            </Form>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="text-center">Protuário</th>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th className="text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">1234567890</td>
                                        <td>Jõao da Silva</td>
                                        <td>11/10/1987</td>
                                        <td className="text-right">
                                            <Button className="btn-icon" color="info" size="sm">
                                                <i className="fa fa-user"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="success" size="sm">
                                                <i className="fa fa-edit"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="danger" size="sm">
                                                <i className="fa fa-times" />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">1234567890</td>
                                        <td>Jõao da Silva</td>
                                        <td>11/10/1987</td>
                                        <td className="text-right">
                                            <Button className="btn-icon" color="info" size="sm">
                                                <i className="fa fa-user"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="success" size="sm">
                                                <i className="fa fa-edit"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="danger" size="sm">
                                                <i className="fa fa-times" />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">1234567890</td>
                                        <td>Jõao da Silva</td>
                                        <td>11/10/1987</td>
                                        <td className="text-right">
                                            <Button className="btn-icon" color="info" size="sm">
                                                <i className="fa fa-user"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="success" size="sm">
                                                <i className="fa fa-edit"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="danger" size="sm">
                                                <i className="fa fa-times" />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">1234567890</td>
                                        <td>Jõao da Silva</td>
                                        <td>11/10/1987</td>
                                        <td className="text-right">
                                            <Button className="btn-icon" color="info" size="sm">
                                                <i className="fa fa-user"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="success" size="sm">
                                                <i className="fa fa-edit"></i>
                                            </Button>{` `}
                                            <Button className="btn-icon" color="danger" size="sm">
                                                <i className="fa fa-times" />
                                            </Button>
                                        </td>
                                    </tr>
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
