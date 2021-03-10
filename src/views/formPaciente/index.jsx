import React from 'react'
import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager/modalMessager'
import './style.css'
import api from '../../variables/api'
import FormularioPaciente from './components/form'
import {
  Modal,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Input,
  ModalFooter,
  Button
} from 'reactstrap'
import axios from 'axios'

// reactstrap components
import { ModalHeader } from 'reactstrap'

class Form_create_paciente extends React.Component {
  constructor(props) {
    const data = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    })
    const dateAux = data.slice(0, 10).split('/')

    super(props)
    this.state = {
      LoadingSpinner: false,
      ModalMessager: false,
      ModalMessagerText: '',
      idPaciente: 0,
      redirectUrl: '',
      requestType: '',
      isLoading: false,
      modalSimulate: false,
      qtdPacientesSimulados: 0,
      isSimulatingPatients: false,
      form: {
        prontuario: '',
        nome: '',
        dataNascimento: '',
        sexo: '',
        peso: 70.5,
        altura: 170,
        dataInternacao: dateAux[2] + '-' + dateAux[1] + '-' + dateAux[0],
        horaInternacao: data.slice(11, 16),
        tipoInternacao: 'Clínica',
        diabetes: 'Ignorado',
        insuficienciaRenal: 'Ignorado',
        corticoide: 'Ignorado',
        infeccao: 'Ignorado',
        sindromeDescRespiratorio: 'Ignorado',
        instabilidadeHemodinamica: 'Ignorado',
        internado: true,
        alta: false,
        planoAplicacao: [
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false
        ],
        observacoes: '',
        glicemia: [],
        aplicacao: []
      }
    }
  }

  toggleModalSimulate = () => {
    this.setState({
        modalSimulate: !this.state.modalSimulate
    });
  }

  simularPacientes = (event) => {
    this.setState({ isSimulatingPatients: true })
    event.preventDefault()
    let qtdPacientes = this.state.qtdPacientesSimulados
    axios.post(`https://patientsimulator.herokuapp.com/patient/${qtdPacientes}`)
      .then((response) => {
        this.props.history.push(`/admin/pacientes?success_message=simulated_patient`) 
        alert("Pacientes simulados com sucesso!")
      })
      .catch((error) => {
        console.log(error)
        alert("Ocorreu um erro ao simular novos pacientes! Tente novamente em instantes.")
      })
      .finally(() => {
      })
  }

  componentDidMount() {
    this.setState({ LoadingSpinner: true, modal: false })
    const {
      match: { params }
    } = this.props
    if (params._idPaciente !== '0') {
      api
        .get('/paciente?tagId=' + params._idPaciente)
        .then(({ data }) => {
          const {
            _id,
            statusPaciente,
            planoAplicacao,
            ...paciente
          } = data.paciente[0]

          let statePlanoAplicacao = this.state.form.planoAplicacao
          planoAplicacao
            .split('#')
            .map(hora => (statePlanoAplicacao[parseInt(hora) - 1] = true))
          let dt = new Date(paciente.dataHoraInternacao)
          let dataNascimento = new Date(paciente.dataNascimento)
          dataNascimento = dataNascimento.getFullYear() +
          '-' +
          String(dataNascimento.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(dataNascimento.getDate() + 1).padStart(2, '0')
          this.setState({
            form: {
              ...paciente,
              dataNascimento,
              dataInternacao:
              dt.getFullYear() +
              '-' +
              String(dt.getMonth() + 1).padStart(2, '0') +
              '-' +
              String(dt.getDate() + 1).padStart(2, '0'),
              horaInternacao: dt.toLocaleTimeString(),
              internado: statusPaciente === 'internado',
              alta: statusPaciente === 'alta',
              planoAplicacao: statePlanoAplicacao
            },
            idPaciente: _id,
            requestType: 'put'
          })
        })
        .finally(e => {
          this.setState({ LoadingSpinner: false })
        })
    } else {
      this.setState({
        LoadingSpinner: false,
        requestType: 'post',
        form: {
          ...this.state.form,
          planoAplicacao: [
            false, false, false, false, false, true, false, false, 
            false, false, false, true, false, false,false, false, false, 
            true, false, false, false, false, false, false
          ]
        }
      })
    }
  }

  toggleMessager = () => {
    if (this.state.redirectUrl !== null) {
      this.props.history.push(this.state.redirectUrl)
    }
    this.setState({ ModalMessager: !this.state.ModalMessager })
  }

  updateInputValue = event => {
    let state = this.state
    state.form[event.target.name] = event.target.value
    this.setState(state)
  }

  updateCheckValue = event => {
    let form = this.state.form
    form.alta = !form.alta
    form.internado = !form.internado
    this.setState(form)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateCheckedAplicacao = event => {
    let form = this.state.form
    form.planoAplicacao[event.target.name] = event.target.checked
    this.setState(form)
  }

  salvarPaciente = planoAplicacao => {
    let dataCriacao = new Date()
    let form = this.state.form
    const { alta, internado, dataInternacao, horaInternacao, ...dadosPaciente } = form
    //Gravando paciente
    api
      .post('/paciente', {
        ...dadosPaciente,
        dataHoraInternacao: dataInternacao + ' ' + horaInternacao,
        statusPaciente: form.alta ? 'alta' : 'internado',
        imc: form.peso / ((form.altura / 100) * (form.altura / 100)),
        planoAplicacao: planoAplicacao,
        createDate: dataCriacao,
        updateDate: dataCriacao
      })
      .then(({ data }) => {
        this.props.history.push(`/admin/PainelPaciente/${data._id}?success_message=save_patient`) 
      })
      .catch(error => {
        this.setState({
          LoadingSpinner: false,
          redirectUrl: null,
          ModalMessager: true,
          ModalMessagerText:
            'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
        })
      })
  }

  atualizarPaciente = planoAplicacao => {
    let dataAtualizacao = new Date()
    let form = this.state.form
    api
      .put('/paciente', {
        _id: this.state.idPaciente,
        dataUpdated: {
          prontuario: form.prontuario,
          nome: form.nome,
          dataNascimento: form.dataNascimento,
          sexo: form.sexo,
          peso: form.peso,
          altura: form.altura,
          imc: form.peso / ((form.altura / 100) * (form.altura / 100)),
          dataHoraInternacao: form.dataInternacao + ' ' + form.horaInternacao,
          tipoInternacao: form.tipoInternacao,
          diabetes: form.diabetes,
          insuficienciaRenal: form.insuficienciaRenal,
          corticoide: form.corticoide,
          infeccao: form.infeccao,
          sindromeDescRespiratorio: form.sindromeDescRespiratorio,
          instabilidadeHemodinamica: form.instabilidadeHemodinamica,
          statusPaciente: form.alta ? 'alta' : 'internado',
          planoAplicacao: planoAplicacao,
          observacoes: form.observacoes,
          updateDate: dataAtualizacao,
          glicemia: form.glicemia,
          aplicacao: form.aplicacao
        }
      }) 
      .then(response => {
        this.props.history.push(`/admin/PainelPaciente/${this.state.idPaciente}?success_message=atualize_patient`) 
      })
      .catch(error => {
        this.setState({
          redirectUrl: null
        })
        this.showOrHideMessager(
          false,
          true,
          'Ocorreu um erro ao tentar salvar o paciente. Tente novamente mais tarde!'
        )
      })

  }

  showOrHideMessager = (
    LoadingSpinner,
    ModalMessager,
    ModalMessagerText,
    redirectUrl = null
  ) => {
    this.setState({
      LoadingSpinner: LoadingSpinner,
      ModalMessager: ModalMessager,
      ModalMessagerText: ModalMessagerText,
      redirectUrl: redirectUrl
    })
  }

  verificarPreenchimentoForm = event => {
    event.preventDefault()
    this.setState({ isLoading: true })

    let form = this.state.form

    //Monta a string do plano de aplicação
    let planoAplicacao = form.planoAplicacao
      .reduce(
        (acumulador, hora, index) =>
          hora === true ? acumulador + (index + 1) + '#' : acumulador + '',
        ''
      )
      .slice(0, -1)

    if (this.state.requestType === 'post') {
      this.salvarPaciente(planoAplicacao)
    } else {
      this.atualizarPaciente(planoAplicacao)
    }
  }

  setRedirectUrl = (redirectUrl) => this.setState({redirectUrl})

  render() {
    return (
      <>
        <Modal isOpen={this.state.modalSimulate} className="text-center" style={{backgroundColor:'red'}}>

          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Simular pacientes
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={this.toggleModalSimulate}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>

          <form onSubmit={this.simularPacientes}>
            <ModalBody className="modal-body">
              <Row>

                <Col md="12">
                  <FormGroup className="text-left">
                    <label>Quantidade de pacientes</label>
                    <Input
                      style={{ color: '#ddd' }}
                      name="qtdPacientesSimulados"
                      value={this.state.qtdPacientesSimulados}
                      onChange={this.handleChange}
                      type="number"
                      required
                    />
                  </FormGroup>
                </Col>

              </Row>
            </ModalBody>

            <ModalFooter className="d-flex justify-content-center modal-footer">
              <Button type="submit" color="secondary" className="w-100" disabled={this.state.isSimulatingPatients} onClick={() => {}}>
                { this.state.isSimulatingPatients ? <><i className="fa fa-spinner fa-spin" /> Carregando </>  : <> SIMULAR </> }
              </Button>
            </ModalFooter>
          </form>

        </Modal>

        <div className="content">
          <LoadingSpinner visible={this.state.LoadingSpinner} />

          <ModalMessager
            visible={this.state.ModalMessager}
            text={this.state.ModalMessagerText}
          >
            <ModalHeader toggle={this.toggleMessager} />
          </ModalMessager>

          <FormularioPaciente
            updateInputValue={this.updateInputValue}
            {...this.state.form}
            updateCheckValue={this.updateCheckValue}
            updateCheckedAplicacao={this.updateCheckedAplicacao}
            verificarPreenchimentoForm={this.verificarPreenchimentoForm}
            requestType={this.state.requestType}
            history={this.props.history}
            setRedirectUrl={this.setRedirectUrl}
            isLoading={this.state.isLoading}
            toggleModalSimulate={this.toggleModalSimulate}
          />
        </div>
      </>
    )
  }
}

export default Form_create_paciente
