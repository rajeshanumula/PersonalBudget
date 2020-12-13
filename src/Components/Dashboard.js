import React from 'react';
import Chart from './Chart'
import D3JS from './D3JS';
import MySql from './mysql';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Hero from './Hero'
import AddExpense from './AddExpense';
import MenuDashboard from './MenuDashboard';
import Logout from './Logout';
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
          <MenuDashboard />
          <Logout />
          <Hero />
          <div className="MainContainer">
            <Switch>
              <Route path="/addexpense">
                <AddExpense />
              </Route>
            </Switch>
          </div>
        </Router>
        <h1>I am from dashboard </h1>
        <D3JS />
        <Chart/>
      </div>
    );
  }
}