import React from "react";
import './style.css'


import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import imgLogo from "../../assets/img/GLYCON-bco.png"
import imgHome from '../../assets/img/img-home.png'
import Login from './components/login'
import Register from './components/register'
import RecoverPassword from './components/recoverPassword'
import api from '../../variables/api'

import checkAuthentication from '../../services/authentication'


class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailLogin: '',
      senhaLogin: '',
      isLoggingIn: false,
      errorMessage: ''
    }
  }

  componentDidMount() {
    checkAuthentication(this.props.history)
  }

  componentDidUpdate() {
    checkAuthentication(this.props.history)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.setState({ isLoggingIn: true })
    const { emailLogin, senhaLogin } = this.state

    api.post('/login', { email: emailLogin, senha: senhaLogin })
      .then(({ data }) => {
        localStorage.setItem('TOKEN', data.token)
        this.props.history.push('/admin/pacientes')
      })
      .catch((error) => {
        this.setState({ isLoggingIn: false, errorMessage: error.response.data })
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
            <Link style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }} to={'#'}>
              Sobre
            </Link>
            <Link style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }} to={'#'}>
              Contato
            </Link>
            <Link style={{ marginRight: 12, marginLeft: 12, color: '#ddd' }} to={'#'}>
              Ajuda
            </Link>
            <Link style={{ marginRight: 12, marginLeft: 12 }} to={'#'}>
              <Button id="btn-assinar" color="primary">
                Assinar
              </Button>
            </Link>
          </Col>

        </Row>

        <Row style={{ margin: 0}}>

          <Col md="8" style={{ height: '100%', marginTop: 30, paddingLeft: '25px' }}>
            <img src={imgHome} alt="" />
          </Col>

          <Col md="4" style={{ height: '100%', flexGrow: 1, marginTop: 50 }}>

            <Switch>
              <Route
                path="/authentication/login"
                render={() => <Login handleLogin={this.handleLogin}
                  handleChange={this.handleChange}
                  emailLogin={this.state.emailLogin}
                  isLoggingIn={this.state.isLoggingIn}
                  senhaLogin={this.state.senhaLogin}
                  errorMessage={this.state.errorMessage}
                />}

              />

              <Route path="/authentication/register" component={Register} />
              <Route path="/authentication/recoverPassword" component={RecoverPassword} />
              <Redirect from="/authentication" to="/authentication/login" />
            </Switch>
          </Col>

        </Row>
      </>
    );
  }
}

export default Authentication;
