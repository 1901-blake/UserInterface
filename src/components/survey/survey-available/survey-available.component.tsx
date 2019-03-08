import React from 'react';
import SurveyInternalComponent from '../survey-internal/survey-internal.component';

export class SurveyAvailableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SurveyInternalComponent />
        );
    }
}


export default SurveyAvailableComponent;