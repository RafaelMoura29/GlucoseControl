import React from 'react'
import './style.css'

import { Route, Switch, Redirect, Link } from 'react-router-dom'
import {
  Row,
  Col,
  Button
} from 'reactstrap'
import imgLogo from '../../assets/img/GLYCON-bco.png'
import imgHome from '../../assets/img/img-home.png'
import Login from './components/login'
import ChangePassword from './components/changePassword'
import RecoverPassword from './components/recoverPassword'
import api from '../../variables/api'

import checkAuthentication from '../../services/authentication'

class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailLogin: '',
      senhaLogin: '',
      isLoggingIn: false,
      isSendingEmail: false,
      errorMessage: '',
      recoverPasswordEmail: '',
      changePassword: '',
      confirmChangePassword: '',
      isChangingPassword: false,
      changePasswordErrorMessage: ''
    }
  }

  componentDidMount() {
    checkAuthentication(this.props.history)
  }

  componentDidUpdate() {
    checkAuthentication(this.props.history)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = event => {
    event.preventDefault()
    this.setState({ isLoggingIn: true, errorMessage: '' })
    const { emailLogin, senhaLogin } = this.state

    api
      .post('/login', { email: emailLogin, senha: senhaLogin })
      .then(({ data }) => {
        localStorage.setItem('TOKEN', data.token)
        this.props.history.push('/admin/pacientes')
      })
      .catch(error => {
        this.setState({
          isLoggingIn: false,
          errorMessage: error.response.data
        })
      })
  }

  handleSendEmail = event => {
    event.preventDefault()
    this.setState({ isSendingEmail: true })

    const { recoverPasswordEmail } = this.state
    let url = window.location.href.split('/authentication/recoverPassword')
    url = url[0] + '/authentication/changePassword'

    api
      .post('/recoverPassword', { email: recoverPasswordEmail, url })
      .then(response => {
        alert('E-mail para recuperação da senha enviado com sucesso!')
        this.setState({ recoverPasswordEmail: '' })
      })
      .catch(error => {
        alert(error.response.data)
      })
      .finally(a => {
        this.setState({ isSendingEmail: false })
      })
  }

  handleChangePassword = event => {
    event.preventDefault()
    this.setState({ isChangingPassword: true, changePasswordErrorMessage: '' })

    const token = this.props.location.pathname.split('changePassword/')[1]
    const { changePassword, confirmChangePassword } = this.state

    if (changePassword !== confirmChangePassword) {
      return this.setState({
        changePasswordErrorMessage: 'As senhas não são iguais!',
        isChangingPassword: false
      })
    }

    api
      .post('/changePassword', {
        token,
        password: changePassword,
        confirmPassword: confirmChangePassword
      })
      .then(response => {
        alert('Senha alterada com sucesso!')
        this.setState({ isChangingPassword: false })
      })
      .catch(error => {
        return this.setState({
          changePasswordErrorMessage:
            'Ocorreu um erro! tente novamente em instantes.',
          isChangingPassword: false
        })
      })
  }

  render() {
    return (
      <>
        <Row id="row-navbar">
          <Col md="6">
            <img src={imgLogo} alt="" height="73" width="245" />
          </Col>

          <Col id="col-navbar-links" md="6">
            <Link
              style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }}
              to={'#'}
            >
              Sobre
            </Link>
            <Link
              style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }}
              to={'#'}
            >
              Contato
            </Link>
            <Link
              style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }}
              to={'#'}
            >
              Ajuda
            </Link>
            <Link style={{ marginRight: 12, marginLeft: 12 }} to={'#'}>
              <Button id="btn-assinar" color="primary">
                Assinar
              </Button>
            </Link>
          </Col>
        </Row>

        <Row style={{ margin: 0 }}>
          <Col
            md="8"
            style={{ height: '100%', marginTop: 30, paddingLeft: '25px' }}
          >
            <img src={imgHome} alt="" />
          </Col>

          <Col md="4" style={{ height: '100%', flexGrow: 1, marginTop: 50 }}>
            <Switch>
              <Route
                path="/authentication/login"
                render={() => (
                  <Login
                    handleLogin={this.handleLogin}
                    handleChange={this.handleChange}
                    emailLogin={this.state.emailLogin}
                    isLoggingIn={this.state.isLoggingIn}
                    senhaLogin={this.state.senhaLogin}
                    errorMessage={this.state.errorMessage}
                  />
                )}
              />

              <Route
                path="/authentication/changePassword/:_token"
                render={() => (
                  <ChangePassword
                    changePassword={this.state.changePassword}
                    confirmChangePassword={this.state.confirmChangePassword}
                    isChangingPassword={this.state.isChangingPassword}
                    handleChange={this.handleChange}
                    handleChangePassword={this.handleChangePassword}
                    changePasswordErrorMessage={
                      this.state.changePasswordErrorMessage
                    }
                  />
                )}
              />

              <Route
                path="/authentication/recoverPassword"
                render={() => (
                  <RecoverPassword
                    component={RecoverPassword}
                    handleChange={this.handleChange}
                    isSendingEmail={this.state.isSendingEmail}
                    recoverPasswordEmail={this.state.recoverPasswordEmail}
                    handleSendEmail={this.handleSendEmail}
                  />
                )}
              />

              <Redirect from="/authentication" to="/authentication/login" />
            </Switch>
          </Col>
        </Row>
      </>
    )
  }
}

export default Authentication
