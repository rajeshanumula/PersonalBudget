import React, { createRef, Component } from "react";
import * as d3 from "d3";
import axios from 'axios';
import '../index.scss'
import {Pie} from 'react-chartjs-2';
export default class D3JS extends React.Component {
  constructor(props) {
    super(props);
    this.innerRadius=150;
    this.outerRadius=300;
    this.ref = createRef();
    this.createPie = d3
      .pie()
      .value(d => d.value)
      .sort(null);
    this.createArc = d3
      .arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius);
    this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    this.format = d3.format(".2f");
  }
  dataSource ={
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
  componentDidMount(){
    //axios.get(`http://localhost:3001/budget`)
    axios.get(`http://localhost:3001/categories`)
    .then(res => {
      for (let  i = 0; i < res.data.length; i++){
        this.dataSource.datasets[0].data[i] = res.data[i].budget;
        this.dataSource.labels[i] = res.data[i].category_name;
      }
      // console.log(res.data.myBudget);
      // for (let  i = 0; i < res.data.myBudget.length; i++){
      //   this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
      //   this.dataSource.labels[i] = res.data.myBudget[i].title;
      // }
      // console.log(this.dataSource);
      const pb = res.data.myBudget;
      this.setState({ pb });
      this.createColorsForD3JS();
    })
  }
  createColorsForD3JS() {
    // console.log(this.dataSource);
    let k = -1;
    this.my_data = this.dataSource.labels.map((label) => {
      k++;
      return { label : label , value : this.dataSource.datasets[0].data[k] };
  });
    // console.log(this.my_data);
    this.colors = d3.scaleOrdinal()
    .domain(this.my_data)
    .range([ '#B21F00','#C9DE00','#2FDE00','#40E0D0',
        '#6800B4','#FA8072','#CD5C5C','#FFD700']);
      this.DrawD3JS(this.my_data);
  }

  DrawD3JS(pb) {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(pb);
    // console.log(pb);
    const width = 400;
    const height=400;
    const innerRadius=400;
    const outerRadius=650;

    svg
      .attr("class", "chart")
      .attr("width", width)
      .attr("height", height);

    const group = svg
      .append("g")
      .attr("transform", `translate(${outerRadius} ${innerRadius})`);

    const groupWithEnter = group
      .selectAll("g.arc")
      .data(data)
      .enter();

    const path = groupWithEnter.append("g").attr("class", "arc");

    path
      .append("path")
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(d.index));
    
    path
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text(d => d.data.label+" ["+ d.value+"]");
  }
  render() {
    return(
    <div>
        <h1 id="d3js">Personal budget using D3JS</h1>
        <svg ref={this.ref} />
        <Pie
          data={this.dataSource}
          options={{
            title:{
              display:true,
              text:'Personal budget using ChartJS',
              fontSize:20,
              fontColor:'#000000'
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    </div>
    )
  }
}