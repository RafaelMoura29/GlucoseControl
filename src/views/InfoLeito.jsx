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
    Table
} from "reactstrap";

// core components
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.jsx";

class InfoLeito extends React.Component {

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="7">
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        <h2 className="title">Nome leito</h2>
                                    </CardTitle>
                                    <CardText>*Paciente internado no leito ou opção para adicionar paciente ao leito</CardText>
                                    <CardText>*Gráfico com quantidade de internações no leito por mês</CardText>

                                    <h3 className="title">Internações</h3>
                                    <Table responsive striped>
                                        <thead className="text-primary">
                                            <tr>
                                                <th className="text-left">Paciente</th>
                                                <th className="text-left">Entrada</th>
                                                <th className="text-left">Saída</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-left">Peter Parker</td>
                                                <td className="text-left">10/10/2019 - 18:30</td>
                                                <td className="text-left">12/10/2019 - 13:59</td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">Mary Jane</td>
                                                <td className="text-left">10/10/2019 - 18:31</td>
                                                <td className="text-left">10/12/2019 - 10:30</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default InfoLeito;
