import React from 'react';
import { Table } from 'reactstrap';

export class SurveyAvailableComponent extends React.Component {
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
        );
    }
}

export default SurveyAvailableComponent;