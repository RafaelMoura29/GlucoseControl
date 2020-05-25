import React from "react";
import './style.css'
import { Link } from "react-router-dom";

import {
    Card,
    CardBody,
    Row,
    Col
} from "reactstrap";

class Sobre extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <div className="content">
                    <Card >
                        <CardBody style={{ textAlign: 'justify' }}>
                            <h1>SOBRE</h1>
                            <p className="mb-3" style={{ fontSize: '1.2em' }}>Glycemic Control Online ou apenas GLYCON é uma aplicação web para auxiliar no controle de glicemias de pacientes internados em Unidades de Terapia Intensiva. </p>
                            <p className="mb-3" style={{ fontSize: '1.2em' }}>Ele foi desenvolvido para ajudar a equipe médica no acompanhamento dos níveis glicêmicos dos pacientes e até mesmo apresentar indicadores que possam auxiliar a equipe em algumas tomadas de decisão.</p>
                            <p className="mb-3" style={{ fontSize: '1.2em' }}>Possui uma interface simples e intuitiva que permite o registo dos dados do paciente, sua situação atual, e principalmente os valores das suas glicemias durante toda a sua internação. Além dos registros, tais dados podem ser consultados inclusive em forma de gráficos para uma melhor avaliação.</p>
                            <p className="mb-3" style={{ fontSize: '1.2em' }}>Seu desenvolvimento tem cunho acadêmico, onde será utilizado como Trabalho de Conclusão de Curso dos alunos Rafael Moura e Vitor Ribeiro, sob a orientação do professor Tiago Segato e auxílio técnico do Dr. Sérgio Fernandes.</p>
                            <p className="mb-3" style={{ fontSize: '1.2em' }}>ATENÇÃO: Esta aplicação está funcionando em caráter de teste para validação. Não deve ser utilizada sem a supervisão de um médico.</p>
                        </CardBody>

                        <Row
                            style={{ marginBottom: 15, paddingLeft: 15 }}
                        >
                            <Col className="pr-md-1" md="2">
                                <Link
                                    style={{ color: '#ddd' }}
                                    to={{}}
                                    onClick={() => this.props.history.goBack()}
                                >
                                    {"<- Voltar"}
                                </Link>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </>
        );
    }
}

export default Sobre;
