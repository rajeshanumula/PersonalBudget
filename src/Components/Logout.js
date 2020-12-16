import React, { Component, useState } from 'react';
import '../CSS/allpages.scss'
import Axios from 'axios';
import '../index.scss'
import '../App.scss';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutstatus: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentWillMount(){
        Axios.get(`http://104.236.17.203/logout`, {
            email: "xyzabc",
            password: "xyzabc",
        }).then((response) => {
            //console.log(response);
            if (response.data.length > 0) {
                window.location = "/dashboard";
            }
            else {
               // console.log(response);
               alert("You are logged out successfully");
                window.location = "/";
            }
        });

    }

    handleSubmit(event) {
    }
    render() {
        return (
            <form onLoad= {() => this.handleSubmit()} id="login-form">
                <div className="menu">
                    {/* <button type="submit" id="login-button">Log Out</button> */}
                </div>
            </form>
        );
    }
}