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

class InfoPaciente extends React.Component {

    render() {
        return (
            <>
                <div className="content">
                    <h1>Informações paciente</h1>
                </div>
            </>
        );
    }
}

export default InfoPaciente;
