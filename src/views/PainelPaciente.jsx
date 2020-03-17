import React from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import { NavLink, Link } from "react-router-dom";

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    CardText,
    Table,
    Badge,
    Button,
    CardHeader
} from "reactstrap";
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
  } from "variables/charts.jsx";
  
class PainelPaciente extends React.Component {

    render() {
        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody>
                            <Row>
                                <Col className="pr-md-1" md="7">
                                    <h2 className="title">Nome paciente</h2>
                                </Col>
                                <Col className="pr-md-1" md="5"></Col>
                            </Row>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Valor Glicemia</th>
                                        <th>Outro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>20/02/2020</td>
                                        <td>120 mg/dl</td>
                                        <td>Algum dado</td>
                                    </tr>
                                    <tr>
                                        <td>20/02/2020</td>
                                        <td>120 mg/dl</td>
                                        <td>Algum dado</td>
                                    </tr>
                                    <tr>
                                        <td>20/02/2020</td>
                                        <td>120 mg/dl</td>
                                        <td>Algum dado</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Col lg="12">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    Evolução da glicemia
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
                        </CardBody>
                    </Card>

                </div>
                <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
                    <Link to="/admin/Form_glicemia">
                        <Button renderAs="button" size="lg" className="btn-round btn-icon" color="warning">
                            <i className="tim-icons icon-simple-add" />
                        </Button>
                    </Link>
                </div>

            </>
        );
    }
}

export default PainelPaciente;
