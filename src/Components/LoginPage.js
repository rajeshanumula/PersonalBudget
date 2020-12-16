import React, { Component, useState } from 'react';
import '../CSS/LoginPage.scss'
import Axios from 'axios';
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";
import '../App.scss';
import '../CSS/allpages.scss'

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
        event.preventDefault();
        const { email, password, loginstatus } = this.state;
        const l_email= email.toLowerCase();
        Axios.post(`http://104.236.17.203:3001/login`, {
            email: l_email,
            password: password,
        }).then((response) => {
            console.log(response);
            console.log(response.data.result[0].account_id);
            const {accessToken, refreshToken} = response.data;
            Cookies.set("access",accessToken);
            Cookies.set("refresh",refreshToken);
            if (response.data.result.length > 0) {
                var path="/dashboard/"+response.data.result[0].account_id;
                console.log(path);
                window.location = "/dashboard";
            }
            else {
                this.setState({loginstatus: response.data.message}); 
            }
        });
    }
    render() {
        return (
            <div className='body1'>
            <form onSubmit={this.handleSubmit} className='login-form1' >
            <h1 id="login-head">Log In</h1>
                    <h4 id="login-head">It’s quick and easy.</h4>
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
                    <input name="password"  type='password' className='lf--input' placeholder='Password'  value={this.state.password} onChange={this.handleChange} required></input>
                </div>
                <div className="flex-row1">
                <input className='lf--submit' type='submit' value='LOGIN'></input>
                </div>
                <div className="error">
                    {this.state.loginstatus === 1 && <p>The email you’ve entered doesn’t match any account. Sign up for an account.</p>}
                    {this.state.loginstatus === 2 && <p>The password you’ve entered is incorrect</p>}
                </div>
                {/* <div><label value={this.state.loginstatus}></label></div> */}
            </form>
            </div>
        );
    }
}