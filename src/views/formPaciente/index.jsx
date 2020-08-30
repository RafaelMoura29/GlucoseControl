import React from 'react'
import LoadingSpinner from '../../components/LoadingSpinner.js'
import ModalMessager from '../../components/ModalMessager/modalMessager'
import './style.css'
import api from '../../variables/api'
import FormularioPaciente from './components/form'

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
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        observacoes: '',
        glicemia: [],
        aplicacao: []
      }
    }
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
          console.log(paciente)
          let dt = new Date(paciente.dataHoraInternacao)
          this.setState({
            form: {
              ...paciente,
              dataInternacao:
                dt.getFullYear() +
                '-' +
                String(dt.getMonth() + 1).padStart(2, '0') +
                '-' +
                dt.getDate(),
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
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false
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
        console.log(data)
        this.setState({
          LoadingSpinner: false,
          ModalMessager: true,
          ModalMessagerText: 'Dados Gravados Com Sucesso',
          redirectUrl: this.state.redirectUrl + data._id
        })
      })
      .catch(error => {
        console.log(error)
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
        console.log(response)
        this.showOrHideMessager(
          false,
          true,
          'Dados Gravados Com Sucesso',
          this.state.redirectUrl + this.state.idPaciente
        )
      })
      .catch(error => {
        console.log(error)
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
    this.setState({
      LoadingSpinner: true,
      modal: false,
      redirectUrl: event.target.value
    })

    let form = this.state.form

    if (form.altura < 0) {
      return this.showOrHideMessager(
        false,
        true,
        'Preencha o campo altura com um valor válido!'
      )
    }

    if (form.peso < 0) {
      return this.showOrHideMessager(
        false,
        true,
        'Preencha o campo peso com um valor válido!'
      )
    }

    //Verifica se o formulário está preenchido
    if (
      form.prontuario === '' ||
      form.nome === '' ||
      form.dataNascimento === '' ||
      form.tipoInternacao === '' ||
      form.diabetes === '' ||
      form.insuficienciaRenal === '' ||
      form.corticoide === '' ||
      form.sexo === '' ||
      form.dataInternacao === '' ||
      form.horaInternacao === '' ||
      form.alta === '' ||
      form.peso === '' ||
      form.altura === '' ||
      form.instabilidadeHemodinamica === '' ||
      form.infeccao === '' ||
      form.sindromeDescRespiratorio === ''
    ) {
      return this.showOrHideMessager(false, true, 'Preencha todos os campos!')
    }

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

  render() {
    return (
      <>
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
          />
        </div>
      </>
    )
  }
}

export default Form_create_paciente
