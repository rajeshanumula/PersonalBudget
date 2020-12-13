import React, { Component, useState } from 'react';
import '../allpages.scss'
import Axios from 'axios';
import '../App.scss';

var passwordHash = require('password-hash');

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            registrationStatus: "",
        };
        this.registrationStatus1 = "";
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { firstname, lastname, email, password, registrationStatus } = this.state;
        const l_firstname= firstname.toLowerCase();
        const l_lastname= lastname.toLowerCase();
        const l_email= email.toLowerCase();
        console.log(l_firstname);
        const plain_password=password;
        var hashedPassword = passwordHash.generate(plain_password);
        console.log(hashedPassword);
        Axios.post(`http://localhost:3001/register`, {
            firstname: l_firstname,
            lastname: l_lastname,
            email: l_email,
            password: hashedPassword,
        }).then((response) => {
            // console.log(response.data.insertId);
            if (response.data.insertId != null) {
                alert("You have successfully registered..You can log in now");
                window.location = "/login";
            }
            else {
                console.log(response.data);
                this.registrationStatus1 = "registration failed"
                console.log(this.registrationStatus1);
            }
        });
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="login-form">
                <div id="login-textbox">
                    <h1 id="login-head">Sign Up</h1>
                    <h4 id="login-head">It’s quick and easy.</h4>
        <h4>{this.registrationStatus1}</h4>
                    <table>
                        <tr>
                            <td><label>FirstName:</label></td>
                            <td><input
                                type="text"
                                name="firstname"
                                placeholder="FirstName"
                                value={this.state.firstname}
                                onChange={this.handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label>LastName:</label></td>
                            <td><input
                                type="text"
                                name="lastname"
                                placeholder="LastName"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            /></td>
                        </tr>
                    </table><br />
                    <button type="submit" id="login-button">Sign up</button>
                    <label>{this.registrationStatus1}</label>
                </div>
            </form>
        );
    }
}