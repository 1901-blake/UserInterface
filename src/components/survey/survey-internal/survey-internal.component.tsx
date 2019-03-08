import * as React from 'react';
import { Table } from 'reactstrap';
// import { ICognitoUser } from '../../../model/cognito-user.model';

// export interface ISurveyInternalComponentProps {
//   manageUsers: ICognitoUser[];
// }

export class SurveyInternalComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Table>
          <thead className="rev-background-color">
            <tr>
              <th>Surveys To Take</th>
              <th>Start Survey</th>
            </tr>
          </thead>
          <tbody>
                <tr className="rev-table-row">
                  <td>amigo</td>
                  <td>sup</td>
                </tr>
          </tbody>
        </Table>
    )
  }
}

export default SurveyInternalComponent;