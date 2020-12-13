import React, { Component, useState } from 'react';
import '../allpages.scss'
import Axios from 'axios';

import '../App.scss';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginstatus: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { email, password, loginStatus } = this.state;
        const l_email= email.toLowerCase();
        Axios.post(`http://localhost:3001/login`, {
            email: l_email,
            password: password,
        }).then((response) => {
            console.log(response.data.message);
            if (response.data.length > 0) {
                window.location = "/dashboard";
            }
            else {
                console.log(response.data);
            }
        });
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="login-form">
                <div id="login-textbox">
                    <h1 id="login-head">Log In</h1>
                    <h4 id="login-head">It’s quick and easy.</h4>
                    <table>
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
                    </table><br/>
                    <button type="submit" id="login-button">Login</button>
                </div>
            </form>
        );
    }
}