import React from 'react';
import '../App.scss';
import Hero from './Hero'
import AboutPage from './AboutPage'
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
//import 'bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
export default class HomePage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Router>
                    <Menu />
                    <Hero />
                    <div className="MainContainer">
                        <Switch>
                            <Route path="/about">
                                <AboutPage />
                            </Route>
                            <Route path="/login">
                                <LoginPage handleSuccessfulAuth={this.handleSuccessfulAuth} />
                            </Route>
                            <Route path="/register">
                                <RegisterPage />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <div className="container center">
                    <div className="page-area">
                        <div className="text-box">
                            <h1>Stay on track</h1>
                            <p>
                                Do you know where you are spending your money? If you really stop to track it down,
                                you would get surprised! Proper budget management depends on real data... and this
                                app will help you with that!
                            </p>
                        </div>

                        <div className="text-box">
                            <h1>Alerts</h1>
                            <p>
                                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                            </p>
                        </div>

                        <div className="text-box">
                            <h1>Results</h1>
                            <p>
                                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                                Also, they to live happier lives... since they expend without guilt or fear...
                                because they know it is all good and accounted for.
                    </p>
                        </div>

                        <div className="text-box">
                            <h1>Free</h1>
                            <p>
                                This app is free!!! And you are the only one holding your data!
                    </p>
                        </div>

                        <div className="text-box">
                            <h1>Stay on track</h1>
                            <p>
                                Do you know where you are spending your money? If you really stop to track it down,
                                you would get surprised! Proper budget management depends on real data... and this
                                app will help you with that!
                    </p>
                        </div>

                        <div className="text-box">
                            <h1>Alerts</h1>
                            <p>
                                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                        </div>

                        <div className="text-box">
                            <h1>Results</h1>
                            <p>
                                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                                Also, they to live happier lives... since they expend without guilt or fear...
                                because they know it is all good and accounted for.
                    </p>
                        </div>

                        <div className="text-box">
                            <h1>Free</h1>
                            <p>
                                This app is free!!! And you are the only one holding your data!
                    </p>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}