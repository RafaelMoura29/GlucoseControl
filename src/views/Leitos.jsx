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
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    CardText,
    UncontrolledTooltip,

} from "reactstrap";

// core components
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.jsx";

class Dashboard extends React.Component {
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
                                <CardHeader >Leito 2
                                <i className="tim-icons icon-paper" href="/#" style={{ float: 'right', cursor: 'pointer', fontSize: 22 }} />
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>Desocupado</CardTitle>
                                    <Button href="/#" color="success">Adicionar paciente</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card>
                                <CardHeader>Leito 2
                                <i className="tim-icons icon-paper" href="/#" style={{ float: 'right', cursor: 'pointer', fontSize: 22 }} />
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>Nome do paciente</CardTitle>
                                    <Button href="/#" color="danger">Remover paciente</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card>
                                <CardHeader>Leito 2
                                <i className="tim-icons icon-paper" href="/#" style={{ float: 'right', cursor: 'pointer', fontSize: 22 }} />
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>Nome do paciente</CardTitle>
                                    <Button href="/#" color="danger">Remover paciente</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card>
                                <CardHeader>Leito 2
                                    <i className="tim-icons icon-paper" href="/#" style={{ float: 'right', cursor: 'pointer', fontSize: 22 }} />
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>Desocupado</CardTitle>
                                    <Button href="/#" color="success">Adicionar paciente</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
                        <Button href="/admin/form_create_leito" size="lg" className="btn-round btn-icon" color="info">
                            <i className="tim-icons icon-simple-add" />
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;
