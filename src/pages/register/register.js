import { Link } from "react-router-dom";
import React, { Component } from "react";
import "./register.css";
export default class Register extends Component {
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
          <input type="text" className="text-input"></input>
        </p>
        <p>
          <button type="button" className="login-button">Login</button>
        </p>
        <p href="#" id="register-text">Já está cadastrado? <Link to={`/`}>Login</Link></p>
      </div>
  );
  }
}
