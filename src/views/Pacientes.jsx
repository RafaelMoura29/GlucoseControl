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
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    CardText
} from "reactstrap";

// core components
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.jsx";

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
                    <Row>
                        <Col lg="3">
                            <Card>
                                <CardHeader className='title'>Peter Parker

                                <NavLink
                                        to={'/admin/infos_leito'}
                                    >
                                        <i className="tim-icons icon-paper" style={{ float: 'right', cursor: 'pointer', fontSize: 22 }} />
                                    </NavLink>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>Prontuário: 123321999</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
                        <Link to="/admin/form_create_paciente">
                            <Button renderAs="button" size="lg" className="btn-round btn-icon" color="info">
                                <i className="tim-icons icon-simple-add" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}

export default Pacientes;
