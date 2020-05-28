import React from "react";
import { Link } from "react-router-dom";
import '../style.css'
import { Col, FormGroup, Input, Form, Row, Button } from "reactstrap";

const Filtros = ({ tipoInternacao, nomePaciente, toggleFiltro }) => (
  <Form className="mb-4">
    <Row>
      <Col className="pr-md-1" md="2">
        <FormGroup>
          <Input
            value={tipoInternacao}
            type="select"
            name="tipoInternacaoFiltro"
            onChange={toggleFiltro}
          >
            <option style={{ backgroundColor: '#27293d' }} value="todos">Todos</option>
            <option style={{ backgroundColor: '#27293d' }} value="internado">Internado</option>
            <option style={{ backgroundColor: '#27293d' }} value="alta">Alta</option>
          </Input>
        </FormGroup>
      </Col>
      <Col className="pr-md-1" md="5">
        <FormGroup >
          <Input
            name="nomePacienteFiltro"
            placeholder="Paciente"
            type="text"
            onChange={toggleFiltro}
            value={nomePaciente}
          />
        </FormGroup>
      </Col>
      <Col md="3"></Col>
      <Col className="pr-md-1" md="2">
        <Link to="/admin/form_create_paciente/0">
          <Button className="btn-fill" color="info" type="submit">
            NOVO
          </Button>
        </Link>
      </Col>
    </Row>
  </Form>

)

export default Filtros;
