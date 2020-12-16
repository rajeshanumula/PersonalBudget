import React, { Component } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';


export default class LinechartsMonthly extends Component {
    constructor(props) {
        super(props);
        this.state = { Data: {} };
    }
    componentDidMount() {
        axios.get(`http://104.236.17.203/monthlybudget`)
            .then(res => {
                console.log(res);
                const dataSource = res.data;
                let month_name = [];
                let budget = [];
                dataSource.forEach(record => {
                    month_name.push(record.month_name);
                    budget.push(record.budget);
                });
                this.setState({
                    Data: {
                        labels: month_name,
                        datasets: [
                            {
                                label: 'Budget',
                                data: budget,
                                backgroundColor: [
                                    "#3cb371",'#B21F00','#C9DE00','#2FDE00','#40E0D0','#6800B4','#FA8072','#CD5C5C','#FFD700','#00FF00',"#4C4CFF","#0000FF",
                                    "#9966FF","#4C4CFF",'#B21F00','#C9DE00','#FFD700','#00FF00',"#4C4CFF","#00FFFF","#f990a7","#aad2ed","#FF00FF","Blue","Red",'#2FDE00','#40E0D0','#6800B4','#FA8072','#CD5C5C'
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
                <Line
                    data={this.state.Data}
                    options={{ maintainAspectRatio: true }} />
            </div>
        )
    }
}

