import * as React from 'react';
import { Switch, Route } from 'react-router';
// import { Route } from 'react-router';
import { SurveyNavComponent } from './survey-nav/survey-nav.component';
import SurveyBuildComponent from './survey-build/survey-build.component';
import SurveyAssignComponent from './survey-assign/survey-assign.component';
import SurveyAnalyticsComponent from './survey-analytics/survey-analytics.component';
import SurveyAvailableComponent from './survey-available/survey-available.component';
// import  SurveyInternalComponent  from './survey-internal/survey-internal.component';
// import { IManageComponentProps } from './manage.container';
// import CreateCohortModal from './create-cohort-modal/create-cohort-modal.container';
// import { ManageInternalComponenet } from './manage-internal/manage-internal.component';
// import { ManageCohortsComponenet } from './manage-cohorts/manage-cohorts.component';
// import CreateUserModal from './create-user-modal/create-user-modal.container';


export class SurveyComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

//   componentDidMount() {
//     const manage = this.props.match.params.manage;
//     if (manage === 'users') {
//       this.props.manageGetUsersByGroup(manage);
//     }
//   }

  updateSurveyTable = (groupName: string) => {
    this.props.manageGetUsersByGroup(groupName);
  }

  render() {
    let {path} = this.props.match;
    console.log(path);
    return (
      <div id="manage-users-container">
        <SurveyNavComponent
          toggleCreateUserModal={this.props.toggleCreateUserModal}
          updateSurveyTable={this.updateSurveyTable}
          manage={this.props.match.params.manage}
          history={this.props.history} 
          location={this.props.location}
          match={this.props.match}/>

        <Switch>
            <Route path={`${path}/build`} component={SurveyBuildComponent} />
            <Route path={`${path}/assign`} component={SurveyAssignComponent} />
            <Route path={`${path}/analytics`} component={SurveyAnalyticsComponent} />
            <Route path={`${path}/available`} component={SurveyAvailableComponent} />
        </Switch>
        
      </div>
    )
  }
}