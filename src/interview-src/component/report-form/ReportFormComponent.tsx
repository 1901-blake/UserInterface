import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { ChartComponent } from './charts/ChartComponent';
import {getInfoAssociate} from '../../actions/assoc-24-chart/assoc24chart.actions';
import {getInfoManager} from '../../actions/manager-24-chart/manager24chart.actions';

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
 getInfoManager : () => void,


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
 getInfoAssociate : () => void,

}


export class ReportForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    associateC : IAssociateChartProps = 
    {
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
        ],},
        getInfoAssociate: this.props.getInfoAssociate

    }



    managerC : IManagerChartProps =
    {
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
        ],},
        getInfoManager: this.props.getInfoManager
        
    }

    componentWillMount()
    {
    getInfoAssociate()
    getInfoManager()
    //we need to get the correct chart data and pass it down to our components
    this.associateC = this.props.associatesChart;
    this.managerC = this.props.managersChart;
    }
 
    render() { 
        return ( 
        <React.Fragment>
             <h1>Interviews that received 24 Hour Notice</h1>>
            <ChartComponent chart1 = {this.associateC} chart2 = {this.managerC}/>
        </React.Fragment>
         );
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);