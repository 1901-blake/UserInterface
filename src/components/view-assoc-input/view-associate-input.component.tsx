import React, { Component } from 'react';
import { IAssociateInput } from '../../model/Associateinput.model';
import { Link } from 'react-router-dom';

interface IProps {
    data: IAssociateInput
}

export class ViewAssociateInput extends Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        // const { data } = this.props;
        return(
            <div>
                <dl>
                    <dt>When did you recieve a notification?</dt>
                    <dd>Response 1</dd>
                    <dt>Were you provided a job description?</dt>
                    <dd>Response 2</dd>
                    <dt>What was the proposed interview format?</dt>
                    <dd>Response 3</dd>
                    <dt>What was the actual interview format?</dt>
                    <dd>Response 4</dd>
                </dl>
                <Link to='/interview/list'>BACK</Link>
            </div>
        );
    }
}
