import React from "react";
import './style.css'


import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { Row, Col, Button, Input, Label, Container } from "reactstrap";
import imgLogo from "../../assets/img/GLYCON-bco.png"
import Login from './components/login'
import Register from './components/register'
import RecoverPassword from './components/recoverPassword'
import api from '../../variables/api'

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailLogin: 'cu',
      senhaLogin: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = () => {
    api.post('/login', {
      email: this.state.emailLogin,
      password: this.state.senhaLogin
    })
      .then(({data}) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
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

        <Row style={{ margin: 0, padding: '25px 10px 17px 25px' }}>

          <Col md="8" style={{ height: '100%' }}>

          </Col>

          <Col md="4" style={{ height: '100%', flexGrow: 1, marginTop: 15 }}>

            <Switch>
              <Route path="/authentication/login" render={() => <Login handleLogin={this.handleLogin} handleChange={this.handleChange} emailLogin={this.state.emailLogin} senhaLogin={this.state.senhaLogin} />} />
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
