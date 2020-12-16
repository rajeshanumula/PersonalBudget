import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import './App.scss';
import HomePage from './Components/HomePage'
import Footer from './Components/Footer'
import Dashboard from './Components/Dashboard'
const myBudget = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#40E0D0',
        '#6800B4',
        '#FA8072',
        '#CD5C5C',
        '#FFD700',
        '#00FF00'
      ]
    }
  ]
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }
  handleSuccessfulAuth(data) {
    let history = useHistory();
    history.push("/dashboard");
  }
  async componentDidMount() {
    //console.log(this.props.jsonData);
    await axios.get(`http://104.236.17.203:3001/budget`)
      .then(res => {
        // console.log(res.data.myBudget);
        for (let i = 0; i < res.data.myBudget.length; i++) {
          myBudget.datasets[0].data[i] = res.data.myBudget[i].budget;
          myBudget.labels[i] = res.data.myBudget[i].title;
        }
        //console.log(myBudget);
        const pb = res.data.myBudget;
        this.setState({ pb });
      })
  }

  render() {
    return (
      <Router>
        <div className="MainContainer">
          <Switch>
            <Route exact
              path={"/dashboard"}
              render={props => (
                <Dashboard />
              )} />
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}
