import React from 'react';
import { Tooltip } from 'reactstrap';
export class MultipleChoice extends React.Component<any, any> {
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
      <div id="multiplePointer">
        <label htmlFor="" style={{ marginBottom: 0, textAlign:'center' }} id="multi" className="form-control" > Multiple Choice </label>
     
          <div className="new" id="t1">

            <input name="questionText" type="text" placeholder="Question Title (i.e. What do you like best? )" style={{ marginLeft: "0px" ,width: '100%' }}   ></input>
           <br/>
            <input name="answerText" type="text" placeholder="answerText (i.e. apples, pie, chicken, ... )" style={{ marginLeft: "0px", width: '100%' }}   ></input>

          </div>
         
   <hr/>
        <div className="yuay">

        </div>
        
      </div>
      <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="multiplePointer" toggle={this.toggle}>Drag and Drop Question</Tooltip>
      </div>

    );
  }
}


export default MultipleChoice;