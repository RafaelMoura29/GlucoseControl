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

// reactstrap components
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    CardText,
    Table,
    Badge
} from "reactstrap";

// core components
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.jsx";

class InfoPaciente extends React.Component {

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="7">
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        <h2 className="title">Peter Parker</h2>
                                    </CardTitle>
                                    <Row className="mb-2">
                                        <Col md='4'>
                                            <CardText className="title">Prontuário:</CardText>
                                            <CardText>123321999</CardText>
                                        </Col>
                                        <Col md='4'>
                                            <CardText className="title">nascimento:</CardText>
                                            <CardText> 14 / 10 / 1990</CardText>
                                        </Col>
                                        <Col md='4'>
                                            <CardText className="title">sexo:</CardText>
                                            <CardText>Masculino</CardText>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md='4'>
                                            <CardText className="title">cpf:</CardText>
                                            <CardText>12345678910</CardText>
                                        </Col>
                                        <Col md='8'>
                                            <CardText className="title">tags:</CardText>
                                            <Badge color="info" pill>Internado</Badge>
                                            <Badge color="info" pill>Coronavirus</Badge>
                                        </Col>
                                    </Row>
                                    <CardText>*Caso o paciente esteja internado mostrar leito </CardText>
                                    <CardText>*Procurar gráfico para representar internações do paciente
                                    https://www.npmjs.com/package/calendar-graph
                                    https://codepen.io/sgratzl/pen/QxoLoY
                                    https://jscharting.com/examples/chart-types/calendar/multi-sparkline-comparison/
                                    https://github.com/kevinsqi/react-calendar-heatmap
                                    </CardText>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default InfoPaciente;
