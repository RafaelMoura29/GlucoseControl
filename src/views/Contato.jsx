import React from "react";

import {
    Card,
    CardBody
} from "reactstrap";

class Contato extends React.Component {

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
                        <CardBody>
                            <h1>CONTATO</h1>
                            <h4 className="title">Caso tenha alguma dúvida ou sugestão, por favor entre em contato conosco: </h4>

                            <p className="mb-1" style={{ fontSize: '1.2em' }}>Tiago Henrique Faccio Segato</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>Professor do IFB e Orientador</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>tiago.segato@ifb.edu.br</p>
                            <p className="mb-4" style={{ fontSize: '0.9em', color: "#aaa" }}>+55 61 9 9676-5957</p>

                            <p className="mb-1" style={{ fontSize: '1.2em' }}>Sérgio Eduardo Soares Fernandes</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>Médico, Epidemiologista</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>sergioesf001@gmail.com</p>
                            <p className="mb-4" style={{ fontSize: '0.9em', color: "#aaa" }}>+55 61 9 8177-1771</p>

                            <p className="mb-1" style={{ fontSize: '1.2em' }}>Rafael Moura da Silva Serafim</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>Estudante do IFB e Desenvolvedor</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>rafaelmoura2929@gmail.com</p>
                            <p className="mb-4" style={{ fontSize: '0.9em', color: "#aaa" }}>+55 61 9 9586-6898</p>

                            <p className="mb-1" style={{ fontSize: '1.2em' }}>Vitor Ribeiro</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>Estudante do IFB e Desenvolvedor</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>33vitorrodrigues@gmail.com</p>
                            <p style={{ fontSize: '0.9em', color: "#aaa" }}>+55 61 9 9635-6968</p>

                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }
}

export default Contato;
