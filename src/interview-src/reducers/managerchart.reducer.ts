import { IManagerChartState } from ".";
import { managerChartTypes } from "../actions/manager-24-chart/manager24chart.actions";

const initialState : IManagerChartState = {
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
}

export const managerChartReducer = (state = initialState, action : any): IManagerChartState => {
    switch (action.type) {
        case managerChartTypes.GET_INFO:
        console.log("Returned Chart Info " + action.payload.chartInfo);
            return {
                ...state,
                data: action.payload.chartInfo,
            }
        default:
            return state
    }
}