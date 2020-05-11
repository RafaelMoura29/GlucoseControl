import React from "react";
import img1 from "../../assets/img/imgs_ajuda/img1.png"
import img2 from "../../assets/img/imgs_ajuda/img2.png"
import img3 from "../../assets/img/imgs_ajuda/img3.png"
import img4 from "../../assets/img/imgs_ajuda/img4.png"
import './style.css'

import {
    Card,
    CardBody
} from "reactstrap";

class Ajuda extends React.Component {

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
                            <h1>AJUDA</h1>

                            <p className="mb-3" style={{ fontSize: '1.2em', textAlign: 'justify' }}>Desenvolvemos o GLYCON para ser o mais simples e intuitivo o possível, mas caso tenha alguma dúvida em relação a sua utilização pode entrar em contato conosco ou seguir as orientações abaixo.</p>
                            <p className="mb-3" style={{ fontSize: '1.2em', textAlign: 'justify' }}>Na tela principal (figura 1), são listados todos os pacientes já cadastrados, caso deseje consultar ou alterar seus dados basta clicar no ícone editar (botão azul contendo o ícone de um lápis), caso deseje inserir um novo paciente, basta clicar no botão NOVO e para fazer uma nova coleta de glicemia é só clicar no botão coleta (representado pelo ícone de uma gota de sangue e de cor vermelha).</p>
                            <img src={img1} alt=""/>
                            <p className="mb-3" style={{ fontSize: '0.9em', color: 'gray', textAlign: 'center' }}>Figura 1 - Tela Principal / Lista de Pacientes</p>

                            <p className="mb-3" style={{ fontSize: '1.2em', textAlign: 'justify' }}>A tela de cadastro e atualização (figura 2) dos dados do paciente são a mesma, a única diferença é que ao escolher novo paciente a tela é aberta com os campos para preenchimento em branco e ao escolher atualizar os campos já vem preenchidos com os dados atuais do paciente.</p>
                            <img src={img2} alt=""/>
                            <p className="mb-3" style={{ fontSize: '0.9em', color: 'gray', textAlign: 'center' }}>Figura 2 – Cadastro e Atualização dos dados do Paciente</p>

                            <p className="mb-3" style={{ fontSize: '1.2em', textAlign: 'justify' }}>Após preencher todos os dados ou fazer a atualização necessária e preencher o plano de coletas (que representa a frequência que as coletas de glicemias devem ser respeitadas), basta salvar, voltar a tela inicial, clicando na opção Pacientes no menu lateral para prosseguir.</p>
                            <p className="mb-3" style={{ fontSize: '1.2em', textAlign: 'justify' }}>Ao clicar em coleta, é apresentada a tela de coletas do paciente (figura 3), ou seja, uma lista com as coletas já realizadas para aquele paciente, caso já existam. Logo abaixo aparecerá um gráfico com os níveis de glicemia relacionados a lista de coletas. É possível escolher o período que deseja gerar o gráfico, caso necessário.</p>
                            <img src={img3} alt=""/>
                            <p className="mb-3" style={{ fontSize: '0.9em', color: 'gray', textAlign: 'center' }}>Figura 3 – Coletas do Paciente</p>

                            <p className="mb-3" style={{ fontSize: '1.2em', textAlign: 'justify' }}>Para inserir uma nova coleta de glicemia basta clicar no botão COLETA e a tela de coleta de glicemias será apresentada (figura 4). Nesta tela, basta entrar com os dados sugeridos, principalmente o valor da glicemia e clicar em SALVAR GLICEMIA.</p>
                            <img src={img4} alt=""/>
                            <p className="mb-3" style={{ fontSize: '0.9em', color: 'gray', textAlign: 'center' }}>Figura 4 – Tela de Coletas de Glicemia</p>

                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }
}

export default Ajuda;
