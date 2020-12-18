import React, { Component } from 'react'
import { Polar } from 'react-chartjs-2';
import axios from 'axios';
export default class PolarChart extends Component {
    constructor(props) {
        super(props);
        this.state = { Data: {} };
    }
    componentDidMount() {
        axios.get(`http://104.236.17.203:3001/categories`)
            .then(res => {
                console.log(res);
                const dataSource = res.data;
                let category_name = [];
                let budget = [];
                dataSource.forEach(record => {
                    category_name.push(record.category_name);
                    budget.push(record.budget);
                });
                this.setState({
                    Data: {
                        labels: category_name,
                        datasets: [
                            {
                                label: 'dataSource 2018/2019 Top Run Scorer',
                                data: budget,
                                backgroundColor: [
                                    "#3cb371",
                                    "#0000FF",
                                    "#9966FF",
                                    "#4C4CFF",
                                    "#00FFFF",
                                    "#f990a7",
                                    "#aad2ed",
                                    "#FF00FF",
                                    "Blue",
                                    "Red"
                                ]
                            }
                        ]
                    }
                });
            })
    }
    render() {
        return (
            <div>
                <Polar data={this.state.Data}
                options={{ maintainAspectRatio: true }} />
            </div>
            )
    }
}
