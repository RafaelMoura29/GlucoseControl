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
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
1h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
2h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
3h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
4h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
5h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
6h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
7h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
8h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
9h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
10h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
11h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
12h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
13h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
14h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
15h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
16h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
17h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
18h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
19h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
20h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
21h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
22h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
23h
<span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </Col>
              <Col md="3">
                <Label className="form-check-label">
                  <Input className="form-check-input checkPlano" type="checkbox" value="" />
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
              Salvar Paciente
</Button>
            <Button className="btn-fill" color="warning" type="submit" onClick={this.toggle}>
              Salvar e Fazer Coleta
</Button>

          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalPlanoAplicacao;