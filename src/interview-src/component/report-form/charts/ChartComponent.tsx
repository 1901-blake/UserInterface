import React from 'react';
import { connect } from 'react-redux';
import {AssociateChartComponent} from './AssociateChartComponent'
import {ManagerChartComponent} from './ManagerChartComponent'
import {getInfoAssociate} from '../../../actions/assoc-24-chart/assoc24chart.actions';
import {getInfoManager} from '../../../actions/manager-24-chart/manager24chart.actions';
import {IState} from '../../../../reducers';


//requires the importing of Line and Item classes, which should also be in Store

 /*
 let receiptTest : Receipt[]
 let receiptLines : Line[]
 */

interface IManagerChartProps
{
  data :  {
    datasets: [{
        data: [number, number],

    backgroundColor: [
        string,
        string
    ],
    borderColor : [
        string,
        string
    ],
    
    }],

    labels : [
      string,
      string
    ],

 },
 chartInfo:[6,4]

}

interface IAssociateChartProps
{
  data :  {
    datasets: [{
        data: [number, number],

    backgroundColor: [
        string,
        string
    ],
    borderColor : [
        string,
        string
    ],
    
    }],

    labels : [
      string,
      string
    ],

 },
 chartInfo:[6,4]

}


export class ChartComponent extends React.Component<any, any> { //the first argument should be IReportFormProps
  constructor(props) {
    super(props);
  }

  //return a new array object!
  associateC : IAssociateChartProps = {
    data: {
        datasets: [{
            data: [50, 20],
                        // These labels appear in the legend and in the tooltips when hovering different arcs
     
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 255, 0.2)',
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 255, 1)',
        ],
        
        }],
    
        labels: [
          'Insufficient Notice',
          'Sufficient Notice',
        ],

    },
    chartInfo:[6,4]
}

managerC : IManagerChartProps = this.props.managersChart;


componentDidMount()
{
//we need to get the correct chart data and pass it down to our components
this.associateC = this.props.associatesChart;
this.managerC = this.props.managersChart;
console.log("Manager's Chart " + JSON.stringify(this.props));
}

render() {
     

    return (
    <div>
      <div id='AssociateChart'>
          <AssociateChartComponent chart = {this.associateC}/>
          <br/>
          <h2>
        Data according to the Associates.
        <hr/>
    </h2>
      </div>
      <div id='ManagerChart'>
          <ManagerChartComponent chart = {this.managerC}/>
          <br/>
          <h2>
        Data according to the Staging Manager.
        <hr/>
        </h2>
      </div>
    </div>
    )
  }
 
}

//connect this to the store and pass in the required states to Props
const mapStateToProps = (state: IState) => {
  return {
      managersChart : state.interviewState.managerChart,
      associatesChart : state.interviewState.associateChart
  }
}

const mapDispatchToProps = {
  getInfoAssociate,
  getInfoManager
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent);
