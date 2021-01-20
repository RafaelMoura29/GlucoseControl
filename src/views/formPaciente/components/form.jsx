import React from 'react'
import '../style.css'
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardFooter,
  Button
} from 'reactstrap'
import AplicacaoCheckBox from './aplicacaoCheckBox'

const FormularioPaciente = ({
  updateInputValue,
  prontuario,
  nome,
  dataNascimento,
  sexo,
  peso,
  altura,
  dataInternacao,
  horaInternacao,
  tipoInternacao,
  diabetes,
  insuficienciaRenal,
  corticoide,
  infeccao,
  sindromeDescRespiratorio,
  instabilidadeHemodinamica,
  internado,
  alta,
  planoAplicacao,
  observacoes,
  updateCheckValue,
  updateCheckedAplicacao,
  verificarPreenchimentoForm,
  requestType,
  history,
  setRedirectUrl
}) => (
  <Row>
    <Col md="12">
      <Card>
        <Form onSubmit={verificarPreenchimentoForm}>
          <CardBody>
            <Row>
              <Col className="pr-md-1" md="12">
                <h3 id="titulo-form">CADASTRO PACIENTE</h3>
              </Col>
            </Row>

            <Row>
              <Col className="pr-md-1" md="6">
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>NOME</label>
                      <Input
                        placeholder="NOME"
                        type="text"
                        name="nome"
                        onChange={updateInputValue}
                        value={nome}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>PRONTUÁRIO</label>
                      <Input
                        placeholder="PRONTUÁRIO"
                        type="text"
                        name="prontuario"
                        onChange={updateInputValue}
                        value={prontuario}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>DATA NASCIMENTO</label>
                      <Input
                        pattern="\d{2}/\d{2}/\d{4}"
                        type="date"
                        name="dataNascimento"
                        placeholder="datetime placeholder"
                        onChange={updateInputValue}
                        value={dataNascimento}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>SEXO</label>
                      <Input
                        name="sexo"
                        type="select"
                        onChange={updateInputValue}
                        value={sexo}
                        required
                      >
                        <option></option>
                        <option>Masculino</option>
                        <option>Feminino</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>TIPO INTERNAÇÃO</label>
                      <Input
                        type="select"
                        name="tipoInternacao"
                        onChange={updateInputValue}
                        value={tipoInternacao}
                        required
                      >
                        <option>clínica</option>
                        <option>cirurgica de urgência</option>
                        <option>cirurgica eletiva</option>
                        <option>sindorme coronariana aguda</option>
                        <option>acidente vascular encefálico</option>
                        <option>trauma</option>
                        <option>oncológica</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>DATA INTERNAÇÃO</label>
                      <Input
                        type="date"
                        name="dataInternacao"
                        placeholder="datetime placeholder"
                        onChange={updateInputValue}
                        value={dataInternacao}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>HORA INTERNAÇÃO</label>
                      <Input
                        type="time"
                        name="horaInternacao"
                        placeholder="datetime placeholder"
                        onChange={updateInputValue}
                        value={horaInternacao}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>ALTURA (CM)</label>
                      <Input
                        min={0}
                        max={300}
                        type="number"
                        name="altura"
                        placeholder="170"
                        onChange={updateInputValue}
                        value={altura}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>PESO (KG)</label>
                      <Input
                        min={0}
                        max={300}
                        type="number"
                        step="0.01"
                        placeholder="70,5"
                        name="peso"
                        onChange={updateInputValue}
                        value={peso}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className="mb-4" md="12">
                    <FormGroup check inline className="form-check-radio">
                      <Label className="form-check-label">
                        <Input
                          radioGroup="statusPaciente"
                          type="radio"
                          name="internado"
                          onChange={updateCheckValue}
                          checked={internado}
                        />
                        INTERNADO
                        <span className="form-check-sign" />
                      </Label>
                    </FormGroup>

                    <FormGroup check inline className="form-check-radio">
                      <Label className="form-check-label">
                        <Input
                          radioGroup="statusPaciente"
                          type="radio"
                          name="alta"
                          onChange={updateCheckValue}
                          checked={alta}
                        />
                        ALTA
                        <span className="form-check-sign"></span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <label>PLANO DE COLETA</label>
                    <FormGroup check>
                      <Row className="mb-4">
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'0'}
                          checked={planoAplicacao[0]}
                          lbl={'1h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'1'}
                          checked={planoAplicacao[1]}
                          lbl={'2h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'2'}
                          checked={planoAplicacao[2]}
                          lbl={'3h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'3'}
                          checked={planoAplicacao[3]}
                          lbl={'4h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'4'}
                          checked={planoAplicacao[4]}
                          lbl={'5h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'5'}
                          checked={planoAplicacao[5]}
                          lbl={'6h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'6'}
                          checked={planoAplicacao[6]}
                          lbl={'7h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'7'}
                          checked={planoAplicacao[7]}
                          lbl={'8h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'8'}
                          checked={planoAplicacao[8]}
                          lbl={'9h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'9'}
                          checked={planoAplicacao[9]}
                          lbl={'10h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'10'}
                          checked={planoAplicacao[10]}
                          lbl={'11h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'11'}
                          checked={planoAplicacao[11]}
                          lbl={'12h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'12'}
                          checked={planoAplicacao[12]}
                          lbl={'13h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'13'}
                          checked={planoAplicacao[13]}
                          lbl={'14h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'14'}
                          checked={planoAplicacao[14]}
                          lbl={'15h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'15'}
                          checked={planoAplicacao[15]}
                          lbl={'16h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'16'}
                          checked={planoAplicacao[16]}
                          lbl={'17h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'17'}
                          checked={planoAplicacao[17]}
                          lbl={'18h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'18'}
                          checked={planoAplicacao[18]}
                          lbl={'19h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'19'}
                          checked={planoAplicacao[19]}
                          lbl={'20h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'20'}
                          checked={planoAplicacao[20]}
                          lbl={'21h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'21'}
                          checked={planoAplicacao[21]}
                          lbl={'22h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'22'}
                          checked={planoAplicacao[22]}
                          lbl={'23h'}
                        />
                        <AplicacaoCheckBox
                          handleChange={updateCheckedAplicacao}
                          name={'23'}
                          checked={planoAplicacao[23]}
                          lbl={'24h'}
                        />
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col className="pr-md-1" md="6">
                <FormGroup>
                  <Label for="exampleText">DIABETES</Label>
                  <Input
                    type="select"
                    name="diabetes"
                    onChange={updateInputValue}
                    value={diabetes}
                    required
                  >
                    <option>Ignorado</option>
                    <option>Controle domiciliar dietético</option>
                    <option>
                      Controle domiciliar com hipoglicemiante oral
                    </option>
                    <option>Controle domiciliar com insulina</option>
                    <option>Controle domiciliar medicamentoso misto</option>
                    <option>Não tem</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">INSUFICIÊNCIA RENAL</Label>
                  <Input
                    type="select"
                    name="insuficienciaRenal"
                    onChange={updateInputValue}
                    value={insuficienciaRenal}
                    required
                  >
                    <option>Ignorado</option>
                    <option>crônica dialítica</option>
                    <option>crônica não dialítica</option>
                    <option>aguda dialítica</option>
                    <option>aguda não dialítica</option>
                    <option>Não tem</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">CORTICOIDE</Label>
                  <Input
                    type="select"
                    name="corticoide"
                    onChange={updateInputValue}
                    value={corticoide}
                    required
                  >
                    <option>Ignorado</option>
                    <option>a mais de 7 dias</option>
                    <option>menos de 7 dias</option>
                    <option>Não tem</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">INSTABILIDADE HEMODINÂMICA</Label>
                  <Input
                    type="select"
                    name="instabilidadeHemodinamica"
                    onChange={updateInputValue}
                    value={instabilidadeHemodinamica}
                    required
                  >
                    <option>Ignorado</option>
                    <option>Sim - Controlado sem drogas vasoativas</option>
                    <option>Sim - Controlado com drogas </option>
                    <option>Sim - Descontrolado apesar das drogas</option>
                    <option>Não tem</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">INFECÇÃO</Label>
                  <Input
                    type="select"
                    name="infeccao"
                    onChange={updateInputValue}
                    value={infeccao}
                    required
                  >
                    <option>Ignorado</option>
                    <option>Infecção simples</option>
                    <option>Sepse</option>
                    <option>Não tem</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">
                    SÍDROME DE DESCONFORTO RESPIRATÓRIO
                  </Label>
                  <Input
                    type="select"
                    name="sindromeDescRespiratorio"
                    onChange={updateInputValue}
                    value={sindromeDescRespiratorio}
                    required
                  >
                    <option>Ignorado</option>
                    <option>Possui</option>
                    <option>Não tem</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">OBSERVAÇÕES</Label>
                  <Input
                    type="textarea"
                    name="observacoes"
                    onChange={updateInputValue}
                    value={observacoes}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <div className="text-center">
              <Button
                className="btn-fill"
                color="info"
                type="submit"
                onClick={() => setRedirectUrl('/admin/pacientes/')}
              >
                {requestType === 'post' ? 'SALVAR' : 'ATUALIZAR'}
              </Button>
              <Button
                className="btn-fill"
                color="warning"
                name="btnColeta"
                type="submit"
                onClick={() => setRedirectUrl('/admin/Form_glicemia/')}
              >
                {requestType === 'post' ? 'SALVAR' : 'ATUALIZAR'} E COLETAR
              </Button>
              <Button
                className="btn-fill"
                id="btn-aplicar"
                name="btnAplicacao"
                type="submit"
                onClick={() => setRedirectUrl('/admin/formAplicacao/')}
              >
                {requestType === 'post' ? 'SALVAR' : 'ATUALIZAR'} E APLICAR
              </Button>
              <Button
                className="btn-fill"
                color="danger"
                onClick={() => history.goBack()}
              >
                CANCELAR
              </Button>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </Col>
  </Row>
)

export default FormularioPaciente
