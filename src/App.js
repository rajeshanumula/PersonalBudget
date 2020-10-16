import React, { useState, useEffect, useContext }  from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Menu from './Menu/Menu'
import Hero from './Hero/Hero'
import HomePage from './HomePage/HomePage'
import Footer from './Footer/Footer'
import AboutPage from './AboutPage/AboutPage'
import LoginPage from './LoginPage/LoginPage'
import Chart from './Chart/Chart'
import D3JS from './D3JS/D3JS';

const myBudget ={
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
  async componentDidMount() {
  //console.log(this.props.jsonData);
  await axios.get(`http://localhost:3001/budget`)
    .then(res => {
        //console.log(res.data.myBudget);
      for (let  i = 0; i < res.data.myBudget.length; i++){
        myBudget.datasets[0].data[i] = res.data.myBudget[i].budget;
        myBudget.labels[i] = res.data.myBudget[i].title;
      }
      //console.log(myBudget);
      const pb = res.data.myBudget;
      this.setState({ pb });
    })
  }

  render() {
    console.log(myBudget);
    return (
      <Router>
        <Menu />
        <Hero />
        <div className="MainContainer">
          <Switch>
            <Route path="/about">
              <AboutPage/>
            </Route>
            <Route path="/login">
              <LoginPage/>
            </Route>
            <Route path="/">
              <HomePage/>
              <Chart/>
              <D3JS/>
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

function App1() {
  const [data,setData]=useState({});
  useEffect(() => {
    const fetchData = async () =>{
      const result = await axios(`http://localhost:3001/budget`,);
      setData(result.data.myBudget);
      console.log(result.data.myBudget);
  };
  fetchData();
  }, []);
  // console.log(data);
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="MainContainer">
        <Switch>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/">
            <HomePage/>
            <Chart/>
            <D3JS/>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

//export default App;
