import React from 'react';
import Chart from 'chart.js';


interface IChartDisplayProps {
chart:any
}

export class AssociateChartComponent extends React.Component<IChartDisplayProps, any> { //the first argument should be IReportFormProps
  canvasRef : any;
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }


componentDidMount()
{
  var ctx = this.canvasRef.current.getContext('2d');
    let myChart = new Chart(ctx, {
        ...this.props.chart,
        type: 'doughnut',
});
if (!myChart) return;
}

render() {
     

    return (
    <canvas  ref={this.canvasRef}></canvas>
    )
  }
 
}

