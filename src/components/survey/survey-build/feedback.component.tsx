import React from 'react';
import { Tooltip } from 'reactstrap';

export class FeedBack extends React.Component<any, any> {
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
        <div id="feedbackPointer">

          <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="feedback" className="form-control" > Feedback </label>

          <div className="new" id="t5">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Please give your feedback)" style={{ width: '100%' }}    >
            </input>

          </div>
          <hr />
        </div>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="feedbackPointer" toggle={this.toggle}>Drag and Drop Question</Tooltip>
      </div>
    );
  }
}


export default FeedBack;