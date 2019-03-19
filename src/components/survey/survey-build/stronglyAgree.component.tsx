import React from 'react';
import { Tooltip } from 'reactstrap';
export class StronglyAgree extends React.Component<any, any> {
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
      <div id="stronglyPointer">
        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="agree" className="form-control" > Strongly Agree-Strongly Disagree </label>

          <div className="new" id="t3">
         
            <input name="questionText" type="text" placeholder="Question Title (i.e. Product is easy to use )" style={{ width: '100%' }}   ></input>
                <input name="answerText" value="Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree" readOnly hidden />
                
         </div>
       

         <hr/>

      </div>
      <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="stronglyPointer" toggle={this.toggle}>Drag and Drop Question</Tooltip>
</div>
    );
  }
}


export default StronglyAgree;