import React from 'react';
import $ from 'jquery'
import { MultipleChoice } from './multiplechoice.component';
import { YesNoMaybe } from './yes_no_question.component';
import { connect } from 'react-redux';
import { StronglyAgree } from './stronglyAgree.component';
import { Rating } from './Rating.component';
import { FeedBack } from './feedback.component';
import { CheckBox } from './checkbox.component';
import { TrueFalse } from './truefalse.component';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { ISurvey } from '../../../model/surveys/survey.model';
import { IQuestion } from '../../../model/surveys/question.model';
import { IAnswer } from '../../../model/surveys/answer.model';
import { IJunctionSurveyQuestion } from '../../../model/surveys/junction-survey-question.model';
import { RouteComponentProps } from 'react-router';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';

interface IComponentProps extends RouteComponentProps<{}> {
  auth: IAuthState,
  match: any
};

class surveyBuild extends React.Component<IComponentProps, any>{
  constructor(props) {
    super(props);
    this.state = {
      isSuccessfullySubmitted: false,
      showModal: false,
      todos: [
        {
          questionID: 1, // make sure this questioID matches the id in the datatype for questiontype
          task: <TrueFalse /> //multiple choice
        },
        {
          questionID: 2,
          task: <MultipleChoice />
        },
        {
          questionID: 3,
          task: <CheckBox />
        },
        {
          questionID: 4,
          task: <Rating />
        },
        {
          questionID: 5,
          task: <FeedBack />
        },
        {
          questionID: 6,
          task: <YesNoMaybe />
        },
        {
          questionID: 7,
          task: <StronglyAgree />
        }


      ],
      completedTasks: [],
      draggedTask: {}
    }
  }

  onDrag = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event) => {
    const { completedTasks, draggedTask } = this.state;


    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      draggedTask: {},
    })
  }

  deleterow = (event, index) => {
    let temp: any[];
    temp = this.state.completedTasks;
    temp.splice(index, 1);

    this.setState({
      completedTasks: temp
    })
  }






  handleSubmit = async (event) => {
    event.preventDefault();
    //if no question are in the drag on drop block then skip creation of survey
    if (this.state.completedTasks.length > 0) {

      let frmData = $(":input").serializeArray();
      //frm data takes in too much data so splice until only title is received
      frmData.splice(0, 13);

      let dummySurvey: ISurvey = {
        surveyId: 1,
        title: frmData,
        description: 'Example Survey 1 Description',
        dateCreated: new Date(),
        closingDate: null,
        template: false,
        published: true
      };
      let dummyQuestionArray: IQuestion[] = [];
      let dummyAnswerArray: IAnswer[] = [];

      let questionindex = 0;// used for connecting answers to their temp question index

      //loop through all the data from the survey
      for (let index = 0; index < frmData.length; index++) {

        let dummyquestion: IQuestion = {
          questionId: {
            questionId: 0,
            question: 'string',
            typeId: 0,
          }
        }
        let dummyAnswers: IAnswer = {
          id: 0,
          answer: "string",
          questionId: 0
        }

        //switch between the types of data from the survey
        switch (frmData[index].name) {
          case 'title':
            dummySurvey.title = frmData[index].value;
            dummySurvey.description = frmData[index].value;
            break;

          case 'description':
            dummySurvey.description = frmData[index].value;
            break;

          case 'questionText':
            dummyquestion.questionId.typeId = this.state.completedTasks[questionindex].questionID;
            dummyquestion.questionId.question = frmData[index].value;
            dummyQuestionArray.push(dummyquestion);
            questionindex += 1//update the group of answers to this question
            break;
          case 'answerText':
            dummyAnswers.id = questionindex;
            dummyAnswers.questionId = questionindex;//if not then use questionindex
            dummyAnswers.answer = frmData[index].value;
            dummyAnswerArray.push(dummyAnswers);
            break;
          case 'template?':
            dummySurvey.template = true;
            dummySurvey.published = false;
            break;

          default:
            break;
        }
      }

      let junctionTable: IJunctionSurveyQuestion = {
        id: 0,
        questionId: {
          questionId: 0,
          question: 'string',
          typeId: 0,
        },
        questionOrder: 0,
        surveyId: dummySurvey,
      }

      let surveyId = await surveyClient.saveSurvey(dummySurvey);
      let questionid = new Array; // used to connect the answers to the database question id

        //loop through the question array that was filled during the frmdata loop
      for (let index = 0; index < dummyQuestionArray.length; index++) {
        //grab the questions id from the database
        //and push the id into the questionid array
        let num = await surveyClient.saveQuestion(dummyQuestionArray[index]);
        //beacuase feedback question has no answer we need to skip the question
        //in order to keep the correct structor 
        if (dummyQuestionArray[index].questionId.typeId != 5) {
          questionid.push(num);
        }

        junctionTable.questionId = dummyQuestionArray[index].questionId;
        junctionTable.questionId.questionId = num;

        junctionTable.questionOrder = index + 1;
        junctionTable.surveyId = dummySurvey;
        junctionTable.surveyId.surveyId = surveyId;


        surveyClient.saveToQuestionJunction(junctionTable);
      }

      let change = dummyAnswerArray[0].id;//keep a temp variable to check if the answer block is connected to its question
      let questionOrder = 0;

      for (let index = 0; index < dummyAnswerArray.length; index++) {

        let match = dummyAnswerArray[index].answer.split(",")//splits the answer choices by comma
        for (let a in match) {//gets each individual answer and creates an answer model to be submitted to the database


          let dummyAnswers: IAnswer = {
            id: 0,
            answer: "string",
            questionId: 0
          }

          let choice = match[a]
          dummyAnswers.answer = choice

          //if the answer block has reached a new question
          //update to the next answer block
          if (change != dummyAnswerArray[index].id) {

            change = dummyAnswerArray[index].id;
            questionOrder++;

          }
       
          dummyAnswerArray[index].questionId = questionid[questionOrder];
          dummyAnswers.questionId = questionid[questionOrder];
          surveyClient.saveAnswer(dummyAnswers);
        }
      }
    }
    else {
      alert('In order to continue, you must choose a question type and fill out the appropriate fields.');
    }
    this.handleShow();//user styleing for creating a survey
  }

  testaxois = async (event) => {
    surveyClient.findSurveyById(2);
  }

  componentDidMount() {
    this.testaxois(event);
  }

  handleShow = () => {
    $('#alertSubmission').show();
    setTimeout(function () {
      $('#alertSubmission').hide();
    }, 3000);
    this.setState({
      showModal: true
    })
  }
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  render() {
    const { todos, completedTasks } = this.state;
    
    return (
      <>
        {/* Used for dragging */}
        <div className="test">
          <div className="todos" >
            {
              todos.map(todo =>
                <div key={todo.questionID} draggable onDrag={(event) => this.onDrag(event, todo)}>
                  {todo.task}
                </div>

              )
            }</div></div>
            




        <div className="container" >
        
          <div className="jumbotron survey-build-jumbotron" id="jumbotronSurveyBuild">

            <form onSubmit={this.handleSubmit} >
              <div id="123d" className={'form-group'}>
                <label htmlFor="title">Survey Title</label>
                <input type="text" className="form-control" name="title" required /><br />
                <input type="checkbox" name="template?" /> Is this a template?

     <br></br><br></br>
                <label htmlFor="description">Survey Description</label>
                <textarea className="form-control" name="description" placeholder="Survey Description" required></textarea><br />

               


                <label htmlFor="type">Add Question Types</label><br />

                {/* Used for dropping from a drag */}
                <div className="App">

                  <div data-required onDrop={event => this.onDrop(event)} onDragOver={(event => this.onDragOver(event))} className="done" >
                    {completedTasks.map((task, index) =>
                      <div key={index}>
                        <br />

                        <button className="btn btn-primary" onClick={() => this.deleterow(event, index)}>Remove &#8628;</button>
                        {task.task}


                      </div>

                    )
                    }
                  </div>
                </div>
               
                <br /><br /><button type="submit" className="createSurveyButton" >Create Survey</button>


              </div>
              <div id="alertSubmission" className="alert alert-success" role="alert">
                Your survey has been successfully submitted!</div>
            </form>
           
          </div>
        </div>
      </>



    );
  }
}

const mapStateToProps = (state: IState) => ({
  auth: state.managementState.auth
});

export default connect(mapStateToProps)(surveyBuild);
