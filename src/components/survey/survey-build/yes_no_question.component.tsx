import React from 'react';
import { Tooltip } from 'reactstrap';
export class YesNoMaybe extends React.Component<any, any> {
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
        <div id="yesnoPointer">

          <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="yn" className="form-control" > Yes/No </label>

          <div className="new" id="t2">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '100%' }}   ></input>
            <input name="answerText" value="Yes, No, Maybe" readOnly hidden />
          </div>

          <hr />
        </div>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="yesnoPointer" toggle={this.toggle}>Drag and Drop Question</Tooltip>
      </div>
    );
  }
}


export default YesNoMaybe;