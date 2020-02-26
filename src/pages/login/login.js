import React, { Component } from "react";
import "./login.css";

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
            <button type="button" href="#" className="login-button">Login</button>
          </p>
          <p href="#" id="register-text">Não tem cadastro ainda? <a href="google.com">cadastre-se</a></p>
        </div>
    );
  }
}
