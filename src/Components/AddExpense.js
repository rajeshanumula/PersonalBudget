import React, { Component, useState } from 'react';
import '../allpages.scss'
import Axios from 'axios';

import '../App.scss';

export default class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: "",
            budget: "",
            addExpenseStatus: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onHandleChangeNumeric=this.onHandleChangeNumeric.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onHandleChangeNumeric = e => {
        const value = e.target.value.replace(/\+|-/ig, '');
        this.setState({budget: value})
       };
    handleSubmit(event) {
        const { category_name, budget, addExpenseStatus } = this.state;
        const u_category_name=category_name.toUpperCase();
        Axios.post(`http://localhost:3001/addexpense`, {
            category_name: u_category_name,
            budget: budget,
        }).then((response) => {
            // console.log(response.data.insertId);
            if (response.data.insertId != null) {
                alert("Expense Added..please refresh");
                window.location = "dashboard";
            }
            else {
                console.log(response.data);
                console.log(this.addExpenseStatus);
            }
        });
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="login-form">
                <div id="login-textbox">
                    <h1 id="login-head">Add Expense</h1>
                    <table>
                        <tr>
                            <td><label>Category:</label></td>
                            <td><input
                                type="text"
                                name="category_name"
                                placeholder="Category Name"
                                value={this.state.category_name}
                                onChange={this.handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label>Budget($):</label></td>
                            <td><input
                                type="number"
                                name="budget"
                                placeholder="Amount"
                                value={this.state.budget}
                                onChange={this.handleChange}
                                required
                            /></td>
                        </tr>
                    </table><br />
                    <button type="submit" id="login-button">Add</button>
                    <label>{this.addExpenseStatus}</label>
                </div>
            </form>
        );
    }
}