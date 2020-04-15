import React from "react";

// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  Modal,
  ModalBody,
  CardText,
  ModalHeader
} from "reactstrap";


class ModalPlanoAplicacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <Modal isOpen={this.props.modal}  fade={true} toggle={this.props.toggle}>
        <ModalBody style={{ backgroundColor: '#1e1e2f' }}>
          <ModalHeader toggle={this.props.toggle}></ModalHeader>
          <h3 className="text-center mb-4">Plano inicial de aplicação</h3>
          <CardText style={{ color: '#aaa' }}>
            Plano inicial de aplicações sugeridos pelo sistema.
            Caso desese alterar selecione os novos horários e
            atualize, caso contrário, basta confirmar.
          </CardText>
          <FormGroup check inline>
            <Row className="mb-4">
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="0"
                    checked={this.props.planoAplicacao[0]}
                    onChange={this.props.planoAplicacaoChange}
                    />
                    1h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="1"
                    checked={this.props.planoAplicacao[1]}
                    onChange={this.props.planoAplicacaoChange} />
                    2h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="2"
                    checked={this.props.planoAplicacao[2]}
                    onChange={this.props.planoAplicacaoChange} />
                    3h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="3"
                    checked={this.props.planoAplicacao[3]}
                    onChange={this.props.planoAplicacaoChange} />
                    4h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="4"
                    checked={this.props.planoAplicacao[4]}
                    onChange={this.props.planoAplicacaoChange} />
                    5h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="5"
                    checked={this.props.planoAplicacao[5]}
                    onChange={this.props.planoAplicacaoChange} />
                    6h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="6"
                    checked={this.props.planoAplicacao[6]}
                    onChange={this.props.planoAplicacaoChange} />
                    7h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="7"
                    checked={this.props.planoAplicacao[7]}
                    onChange={this.props.planoAplicacaoChange} />
                    8h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="8"
                    checked={this.props.planoAplicacao[8]}
                    onChange={this.props.planoAplicacaoChange} />
                    9h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="9"
                    checked={this.props.planoAplicacao[9]}
                    onChange={this.props.planoAplicacaoChange} />
                    10h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="10"
                    checked={this.props.planoAplicacao[10]}
                    onChange={this.props.planoAplicacaoChange} />
                    11h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="11"
                    checked={this.props.planoAplicacao[11]}
                    onChange={this.props.planoAplicacaoChange} />
                    12h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="12"
                    checked={this.props.planoAplicacao[12]}
                    onChange={this.props.planoAplicacaoChange} />
                    13h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="13"
                    checked={this.props.planoAplicacao[13]}
                    onChange={this.props.planoAplicacaoChange} />
                    14h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="14"
                    checked={this.props.planoAplicacao[14]}
                    onChange={this.props.planoAplicacaoChange} />
                    15h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="15"
                    checked={this.props.planoAplicacao[15]}
                    onChange={this.props.planoAplicacaoChange} />
                    16h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="16"
                    checked={this.props.planoAplicacao[16]}
                    onChange={this.props.planoAplicacaoChange} />
                    17h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="17"
                    checked={this.props.planoAplicacao[17]}
                    onChange={this.props.planoAplicacaoChange} />
                    18h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="18"
                    checked={this.props.planoAplicacao[18]}
                    onChange={this.props.planoAplicacaoChange} />
                    19h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="19"
                    checked={this.props.planoAplicacao[19]}
                    onChange={this.props.planoAplicacaoChange} />
                    20h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="20"
                    checked={this.props.planoAplicacao[20]}
                    onChange={this.props.planoAplicacaoChange} />
                    21h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="21"
                    checked={this.props.planoAplicacao[21]}
                    onChange={this.props.planoAplicacaoChange} />
                    22h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="22"
                    checked={this.props.planoAplicacao[22]}
                    onChange={this.props.planoAplicacaoChange} />
                    23h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input 
                    className="form-check-input checkPlano" 
                    type="checkbox" 
                    name="23"
                    checked={this.props.planoAplicacao[23]}
                    onChange={this.props.planoAplicacaoChange} />
                    24h
                    <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>

            </Row>

          </FormGroup>
          <div className="text-center">
            <Button className="btn-fill" color="info" type="submit" onClick={this.props.click}>
              {this.props.textBtn} Paciente
            </Button>
            <Button className="btn-fill" color="warning" name="btnColeta"type="submit" onClick={this.props.clickColeta}>
              {this.props.textBtn} e Fazer Coleta
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalPlanoAplicacao;