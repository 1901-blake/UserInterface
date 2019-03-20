import React from 'react';
import { Tooltip } from 'reactstrap';
export class CheckBox extends React.Component<any, any> {
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
        <div id="checkPointer">
          <label htmlFor="" id="checkbox" style={{ marginBottom: 0, textAlign: 'center' }} className="form-control" > Checkboxes for Multiple Answers </label>

          <div className="new" id="t6">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Choose one or more response: Which of these objects is white? )" style={{ marginLeft: "0px%", width: '100%' }}   ></input>
            <br></br>
            <input name="answerText" type="text" placeholder="answerText (i.e. the moon, rice, cotton, blueberries, lemons )" style={{ marginLeft: "0px", width: '100%' }}   ></input>

          </div>
          <hr />
          <div className="yuay">

          </div>


        </div>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="checkPointer" toggle={this.toggle}>Drag and Drop Question</Tooltip>
      </div>
    );
  }
}


export default CheckBox;