import React, { createRef, Component, useState } from "react";
import axios from 'axios';
import '../index.scss'
import { Bar, Line, Pie } from 'react-chartjs-2';

export default class ColumnChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData,
            //chartData1: props.chartData1,
            chartData1: {
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
        }
        //console.log("From Constructor")
    }
    componentDidMount() {
        axios.get(`http://104.236.17.203:3001/categories`)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    this.state.chartData1.datasets[0].data[i] = res.data[i].budget;
                    this.state.chartData1.labels[i] = res.data[i].category_name;
                }
            })
    }
    render() {
        return (
            <div id="chart">
                {/* <Chart options={this.state.chartData.options} series={this.state.chartData.series} type="bar" height={430} >Hello22</Chart> */}
                <div width="50px">
                    <Bar width="50%" height={10}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        data={this.state.chartData1}
                        options={{
                            title: {
                                display: true,
                                text: 'Personal Budget',
                                fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: "right"
                            }
                        }}
                    />
                </div>
            </div>);
    }
}