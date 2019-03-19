import React from 'react';
import { Tooltip } from 'reactstrap';
export class TrueFalse extends React.Component<any, any> {
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
      <div id="pointer">
     
        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="tf" className="form-control" > True/False </label>

        <div className="new" id="t7">

          <input name="questionText" type="text" placeholder="Question Title (i.e. The sky is blue) " style={{ width: '100%' }}   ></input>
          <input name="answerText" value="True,False" readOnly hidden />
        </div>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="pointer" toggle={this.toggle}>Drag and Drop Question</Tooltip>
        <hr />
       
      </div>
     
</div>
    );
  }
}


export default TrueFalse;