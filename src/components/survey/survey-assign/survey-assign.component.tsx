import React, { Fragment } from 'react';
import SurveyModal from './survey-assign-modal.component';
import { Table } from 'reactstrap';

export class SurveyAssignComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Table striped id="manage-users-table" className="tableUsers">
                    <thead className="rev-background-color">
                    <tr>
                        <th>Select</th>
                        <th colSpan={5}>Surveys To Assign</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="rev-table-row">
                            <td><input type="checkbox"/></td>
                            <td colSpan={5}>QC Survey</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="rev-table-row">
                            <td><input type="checkbox"/></td>
                            <td colSpan={5}>Template 1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="rev-table-row">
                            <td><input type="checkbox"/></td>
                            <td colSpan={5}>Template 2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="rev-table-row">
                            <td colSpan={5}><input type="checkbox"/></td>
                            <td>Template 3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>

                <div className="buttonDiv">
                    <tr>
                        <td><SurveyModal buttonLabel='Edit' className='assignSurveyBtn'/></td>
                        <td><SurveyModal buttonLabel='Assign' className='assignSurveyBtn'/></td>
                    </tr>
                </div>
            </Fragment>
        );
    }
}


export default SurveyAssignComponent;