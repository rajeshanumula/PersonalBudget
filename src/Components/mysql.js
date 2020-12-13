import React from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

export default class MySql extends React.Component {
  myBudget ={
    labels: ["a","b","c"],
    datasets: [
      {
        data: [1,2,3],
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
  
  componentDidMount() {
     axios.get(`http://localhost:3001/categories`)
    //axios.post(`http://localhost:3001/login`)
      .then(res => {
        console.log(res.data);
        for (let  i = 0; i < res.data.length; i++){
          this.myBudget.datasets[0].data[i] = res.data[i].budget;
          this.myBudget.labels[i] = res.data[i].category_name;
        }
        //console.log(this.myBudget);
        const pb = res.data.myBudget;
        this.setState({ pb });
      })
  }

  render() {
    return (
      <div>
        <Pie
          data={this.myBudget}
          options={{
            title:{
              display:true,
              text:'Personal budget using ChartJS mysql',
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