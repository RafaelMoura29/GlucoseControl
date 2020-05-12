import React from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import './style.css'

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
    Button,
    CardHeader,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import {
    chartExample2,
    lineChart
} from "variables/charts.jsx";

const axios = require('axios');

class FormAplicacao extends React.Component {

    constructor(props) {
        super()
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this._idPaciente = params._idPaciente;
    }

    render() {
        return (
            <>
                <div className="content">
                    <h1>Aplicacao</h1>
                </div>
            </>
        );
    }
}

export default FormAplicacao;
