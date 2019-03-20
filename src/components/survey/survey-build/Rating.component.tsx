import React from 'react';
import { Tooltip } from 'reactstrap';
export class Rating extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };

    }
    toggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
      }
    render() {

        return (
            <div>
                <div id="ratingPointer">

                    <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="rating" className="form-control" > Rating </label>

                    <div className="new" id="t4">

                        <input name="questionText" type="text" placeholder="Question Title (i.e. How likely are you to recommend our product to a friend? )" style={{ width: '100%' }}   ></input>
                        <input name="answerText" value="1,2,3,4,5" readOnly hidden />

                    </div>

                    <hr />

                </div>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="ratingPointer" toggle={this.toggle}>Drag and Drop Question</Tooltip>
            </div>
        );
    }
}


export default Rating;