import React, { Component } from "react";
import "./login.css";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
        <div id="container">
          <h1 id="title">BlackBook</h1>
          <p>
            <input type="text" className="text-input"></input>
          </p>
          <p>
            <input type="text" className="text-input"></input>
          </p>
          <p>
            <button type="button" className="login-button">Login</button>
          </p>
          <p href="#" id="register-text">Não tem cadastro ainda? <Link to={`/register/`}>cadastre-se</Link></p>
        </div>
    );
  }
}
