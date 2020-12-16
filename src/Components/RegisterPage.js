import React, { Component, useState } from 'react';
import '../CSS/allpages.scss'
import '../CSS/LoginPage.scss'
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
            confirm_password: "",
            registrationStatus: "",
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    validate() {
        const { firstname, lastname, email, password, confirm_password } = this.state;
        let errors = {};
        let isValid = true;

        if (typeof password !== "undefined" && typeof confirm_password !== "undefined") {

            if (password != confirm_password) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleSubmit(event) {
        if (this.validate()) {
            const { firstname, lastname, email, password, registrationStatus } = this.state;
            const l_firstname = firstname.toLowerCase();
            const l_lastname = lastname.toLowerCase();
            const l_email = email.toLowerCase();
            //console.log(l_firstname);
            const plain_password = password;
            var hashedPassword = passwordHash.generate(plain_password);
            //console.log(hashedPassword);
            //console.log(this.validate());
            Axios.post(`http://104.236.17.203:3001/register`, {
                firstname: l_firstname,
                lastname: l_lastname,
                email: l_email,
                password: hashedPassword,
            }).then((response) => {
                // console.log(response.data.insertId);
                if (response.data.insertId != null) {
                    alert("User registered successfully! You can log in now");
                    window.location = "/login";
                }
                else {
                    this.setState({ registrationStatus: 1 });
                }
            });
        }
        else {
            //alert("Passwords do not match");
            this.setState({ registrationStatus: 2 });
        }
        event.preventDefault();
    }
    render() {
        return (
            <div className='body1'>
                <form onSubmit={this.handleSubmit} className="login-form1">
                    <h1 id="login-head">Sign Up</h1>
                    <h4 id="login-head">It’s quick and easy.</h4>
                    <div className="flex-row">
                        <label className="lf--label" for="firstname">
                            <svg x="0px" y="0px" width="12px" height="13px">
                                <path fill="#B1B7C4" d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z" />
                            </svg>
                        </label>
                        <input name="firstname" className='lf--input' placeholder='First Name' value={this.state.firstname} onChange={this.handleChange} required type='text'></input>
                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>
                    <div className="flex-row">
                        <label className="lf--label" for="lastname">
                            <svg x="0px" y="0px" width="12px" height="13px">
                                <path fill="#B1B7C4" d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z" />
                            </svg>
                        </label>
                        <input name="lastname" value={this.state.lastname} onChange={this.handleChange} required className='lf--input' placeholder='Last Name' type='text'></input>
                    </div>
                    <div className="flex-row">
                        <label className="lf--label" for="email">
                            <svg x="0px" y="0px" width="12px" height="13px">
                                <path fill="#B1B7C4" d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z" />
                            </svg>
                        </label>
                        <input name="email" className='lf--input' placeholder='Email' value={this.state.email} onChange={this.handleChange} required type='email'></input>
                    </div>
                    <div className="flex-row">
                        <label className="lf--label" for="password">
                            <svg x="0px" y="0px" width="15px" height="5px">
                                <g>
                                    <path fill="#B1B7C4" d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z" />
                                </g>
                            </svg>
                        </label>
                        <input name="password" type='password' className='lf--input' placeholder='Password' value={this.state.password} onChange={this.handleChange} required></input>
                    </div>
                    <div className="flex-row">
                        <label className="lf--label" for="password">
                            <svg x="0px" y="0px" width="15px" height="5px">
                                <g>
                                    <path fill="#B1B7C4" d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z" />
                                </g>
                            </svg>
                        </label>
                        <input name="confirm_password" type='password' className='lf--input' placeholder='Confirm Password' value={this.state.confirm_password} onChange={this.handleChange} required></input>
                    </div>
                    <div className="flex-row1">
                        <input className='lf--submit' type='submit' value='REGISTER'></input>
                    </div>
                    <div className="error">
                        {this.state.registrationStatus === 1 && <p>Registration failed</p>}
                        {this.state.registrationStatus === 2 && <p>Passwords not matched</p>}
                    </div>
                </form>
            </div>
        );
    }
}