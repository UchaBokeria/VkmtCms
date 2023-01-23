import './Report.scss'
import { Component } from 'react';
import { ReportSource } from './ReportSource';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default class Report extends Component <{}, any> {

  constructor(props) {
    super(props);
    this.state = {
      pie: {
        labels: ['Sold', 'In Stock'],
        datasets: [
          {
            label: 'percent %',
            data: [70, 30],
            backgroundColor: [
              '#3364a3',
              'purple',
            ],
            borderWidth: 0,
          },
        ],
      }
    }
  }

  componentDidMount = async () => {
    // this.setState({
      
    // })
  }
  render() {
    return (
        <div className='Report'>
          <div className='center'>
            <Pie data={this.state.pie} />
          </div>
        </div>
    )
  }
}