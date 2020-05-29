import React from "react";
import '../style.css'
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";

const FormularioAplicacao = ({
  prontuario,
  dataHoraInternacao,
  paciente,
  dataAplicacao,
  horaAplicacao,
  tipoAplicacao,
  viaAdministracao,
  droga,
  posologia,
  observacoes,
  handleChange,
  opcoesDroga
}) => (
    <Form>
      <Row>

        <Col className="pr-md-1" md="6">
          <Row>
            <Col className="pr-md-1" md="6">
              <FormGroup>
                <Label>PRONTUÁRIO</Label>
                <Input
                  placeholder="Prontuário"
                  type="text"
                  name="prontuario"
                  value={prontuario}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col className="pr-md-1" md="6">
              <FormGroup>
                <Label>DATA/HORA INTERNAÇÃO</Label>
                <Input
                  placeholder="Data/Hora"
                  type="text"
                  name="dataHoraInternacao"
                  value={dataHoraInternacao}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col className="pr-md-1" md="12">
              <FormGroup>
                <Label>PACIENTE</Label>
                <Input
                  placeholder="Paciente"
                  type="text"
                  name="paciente"
                  value={paciente}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col className="pr-md-1" md="6">
              <FormGroup>
                <Label>DATA APLICAÇÃO</Label>
                <Input
                  type="date"
                  placeholder="Data Aplicação"
                  value={dataAplicacao}
                  onChange={handleChange}
                  name="dataAplicacao"
                />
              </FormGroup>
            </Col>

            <Col className="pr-md-1" md="6">
              <FormGroup>
                <Label>HORA APLICAÇÃO</Label>
                <Input
                  placeholder="Hora Aplicação"
                  type="time"
                  name="horaAplicacao"
                  value={horaAplicacao}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>

            <Col className="pr-md-1" md="12">
              <FormGroup>
                <Label>TIPO APLICAÇÃO</Label>
                <Input
                  type="select"
                  name="tipoAplicacao"
                  value={tipoAplicacao}
                  onChange={handleChange}
                >
                  <option value="de resgate">De Resgate</option>
                  <option value="de horario">De Horário</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Col>

        <Col className="pr-md-1" md="6">
          <Col className="pr-md-1" md="12">
            <FormGroup>
              <Label>VIA ADMINISTRAÇÃO</Label>
              <Input
                type="select"
                name="viaAdministracao"
                value={viaAdministracao}
                onChange={handleChange}
              >
                <option value="intravenoso">Intravenoso</option>
                <option value="sub cutaneo">Sub Cutâneo</option>
                <option value="via oral">Via Oral</option>
              </Input>
            </FormGroup>
          </Col>

          <Col className="pr-md-1" md="12">
            <FormGroup>
              <Label>DROGA</Label>
              <Input
                type="select"
                name="droga"
                value={droga}
                onChange={handleChange}
              >
                {opcoesDroga.map((opcao, index) => (
                  <option key={index} value={opcao}>{opcao}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          <Col className="pr-md-1" md="12">
            <FormGroup>
              <Label>POSOLOGIA</Label>
              <Input
                placeholder="Posologia"
                type="text"
                name="posologia"
                value={posologia}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>

          <Col className="pr-md-1" md="12">
            <FormGroup>
              <Label>OBSERVAÇÕES</Label>
              <Input
                type="textarea"
                name="observacoes"
                placeholder="Observações"
                value={observacoes}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Col>

      </Row>
    </Form>
  )

export default FormularioAplicacao;
