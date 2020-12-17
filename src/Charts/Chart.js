import React from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

export default class Chart extends React.Component {
  myBudget ={
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
  
  componentDidMount() {
    //axios.get(`  http://104.236.17.203:3001/budget`)
      axios.get(`  http://104.236.17.203:3001/categories`)
      .then(res => {
       // console.log(res.data.myBudget);
        for (let  i = 0; i < res.data.length; i++){
          this.myBudget.datasets[0].data[i] = res.data[i].budget;
          this.myBudget.labels[i] = res.data[i].category_name;
        }
        //console.log(res.data.myBudget);
        // for (let  i = 0; i < res.data.myBudget.length; i++){
        //   this.myBudget.datasets[0].data[i] = res.data.myBudget[i].budget;
        //   this.myBudget.labels[i] = res.data.myBudget[i].title;
        // }
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