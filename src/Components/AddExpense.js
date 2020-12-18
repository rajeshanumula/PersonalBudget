import React, { Component } from 'react';
import '../CSS/LoginPage.scss'
import Axios from 'axios';
import 'react-dropdown/style.css';
import '../App.scss';
import Cookies from 'js-cookie';

export default class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: "",
            budget: "",
            month: "",
            addExpenseStatus: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.options = ['one', 'two', 'three'];
        this.defaultOption = this.options[0];
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    hasAccess(accessToken, refreshToken) {
        //console.log("From has AccessMethod")
        if (!refreshToken) {
            //console.log(refreshToken);
            return null;
        }
        if (accessToken === undefined) {
            //console.log("accessToken is undefined")
            //generate new accessToken
            accessToken = this.refresh(refreshToken);
            //console.log(accessToken);
            return accessToken;
        }
        if (!accessToken) {
            //console.log("accessToken is undefined222")
            //generate new accessToken
            accessToken = this.refresh(refreshToken);
            //console.log(accessToken);
            return accessToken;
        }
        return accessToken;
    }

    refresh(refreshToken) {
        //console.log("Refreshing Token");
        return new Promise((resolve, reject) => {
            Axios.post("http://104.236.17.203:3001/refresh", { token: refreshToken })
                .then((response) => {
                    if (response.data.success === false) {
                        resolve(false);
                        alert("Please log in again");
                        window.location = '/';
                    }
                    else {
                        //console.log(response)
                        const { accessToken } = response.data;
                        Cookies.set("access", accessToken);
                        resolve(accessToken);
                    }
                });
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log("I am from AddExpense");
        let accessToken = Cookies.get("access");
        let refreshToken = Cookies.get("refresh");
        //console.log(accessToken);
        //console.log(refreshToken);
        accessToken = this.hasAccess(accessToken, refreshToken);
        //console.log(accessToken);
        if (!accessToken) {
            //Say Login again
            //console.log("Log In Again");
            alert("Log in Again")
            window.location = "/";
        }
        else {
            //Log in Success
            //console.log("You are logged in ");
            //await requestLogin(accessToken, refreshToken);

            const { category_name, budget } = this.state;
            const u_category_name = category_name.toUpperCase();
            Axios.post(`http://104.236.17.203:3001/addexpense`, {
                category_name: u_category_name,
                budget: budget,
                month: this.menu.value
            }, { headers: { "authorization": `Bearer ${accessToken}` } })
                .then((response) => {
                    //console.log(response);
                    if (response.data.success === false) {
                        if (response.data.message === 'Access token expired') {
                            accessToken = this.refresh(refreshToken);
                            Cookies.set("access", accessToken);
                            //console.log("token refreshed");
                            this.handleSubmit(event);
                        }
                        if (response.data.message === 'User not authenticated') {
                            alert("You are not authenticated");
                            window.location = '/';
                        }
                    }
                    else if (response.data.insertId != null) {
                        alert("Expense Added...!");
                        window.location = "dashboard";
                    }
                    else {
                        //console.log(response.data);
                        //console.log(this.addExpenseStatus);
                    }
                });
        }

        ////console.log(this.menu.value);

    }
    render() {
        return (
            <div className='body11'>
                <form onSubmit={this.handleSubmit} id="login-form1">
                    <h1 id="login-head">Add Expense</h1>
                    <div className="flex-row">

                        <select id="dropdown" required ref={(input) => this.menu = input} className='lf--input'>
                            <option value="1">SELECT MONTH</option>
                            <option value="1">JANUARY</option>
                            <option value="2">FEBRUARY</option>
                            <option value="3">MARCH</option>
                            <option value="4">APRIL</option>
                            <option value="5">MAY</option>
                            <option value="6">JUNE</option>
                            <option value="7">JULY</option>
                            <option value="8">AUGUST</option>
                            <option value="9">SEPTEMBER</option>
                            <option value="10">OCTOBER</option>
                            <option value="11">NOVEMBER</option>
                            <option value="12">DECEMBER</option>
                        </select>
                    </div>
                    <div className="flex-row">
                        <input className='lf--input'
                            type="text"
                            name="category_name"
                            placeholder="Category Name"
                            defaultValue={this.state.category_name}
                            onChange={this.handleChange}
                            required></input>
                    </div>
                    <div className="flex-row">
                        <input className='lf--input'
                            type="number"
                            name="budget"
                            placeholder="Amount"
                            defaultValue={this.state.budget}
                            onChange={this.handleChange}
                            required
                        ></input>
                    </div>
                    <div className="flex-row1">
                        <input className='lf--submit' type='submit' value='Add'></input>
                    </div>
                </form>
            </div>
        );
    }
}