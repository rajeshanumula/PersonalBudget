import React from 'react';
import CRUDTable from './CRUDTable'
import '../CSS/LoginPage.scss'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Hero from './Hero'
import AddExpense from './AddExpense';
import MenuDashboard from './MenuDashboard';
import EditCategory from './EditCategory';
import MonthlyBudget from './MonthlyBudget'
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart'
import BarchartMonthly from '../Charts/BarChartMonthly';
import LineChartMonthly from '../Charts/LineChartMonthly';
import PiechartMonthly from '../Charts/PieChartMonthly';
import Logout from './Logout'
import { useHistory, useParams } from "react-router-dom";


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    //const { account_id } = useParams();
    //console.log(account_id);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <Router>
          <MenuDashboard />
          <div className="MainContainer">
            <Switch>
              <Route path="/addexpense">
                <Hero />
                <AddExpense />
              </Route>
              <Route path="/editexpense">
                <Hero />
                <CRUDTable />
              </Route>
              <Route path="/monthlybudget">
                <Hero />
                <table>
                  <tr>
                    <td className="chart"><MonthlyBudget /></td>
                    <td className="chart"><BarchartMonthly /></td>
                  </tr>
                  <tr>
                    <td className="chart"><LineChartMonthly /></td>
                    <td className="chart"><PiechartMonthly /></td>
                  </tr>
                </table>
              </Route>
              <Route path="/dashboard/">
                <Hero/>
                <table>
                  <tr>
                    <td className="chart"><PieChart /></td>
                    <td className="chart"><BarChart /></td>
                  </tr>
                  <tr>
                    <td className="chart"><LineChart /></td>
                    <td className="chart"><BarChart /></td>
                  </tr>
                </table>
              </Route>
              {/* <Route exact path="/editcategory/:category_id" component={EditCategory} /> */}
              <Route path="/editcategory/:category_id">
                <Hero />
                <EditCategory />
              </Route>
              <Route path="/logout">
                <Logout/>
              </Route>
            </Switch>
          </div>
        </Router>
        <div>
        </div>
      </div>
    );
  }
}