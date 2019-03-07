import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          taskID: 1,
          task: 'Walk the walk'
        },
        {
          taskID: 2,
          task: 'Talk the talk'
        },
        {
          taskID: 3,
          task: 'Jump the jump'
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

  onDrop = (event ) => {
    const { completedTasks, draggedTask, todos } = this.state;
    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      todos: todos.filter(task => task.taskID !== draggedTask.taskID),
      draggedTask: {},
    })
  }
  render() {
    const { todos, completedTasks} = this.state;
    return (
      <div className="App">
        <div className="todos">
          {
            todos.map(todo =>
              <div
                key={todo.taskID}
                draggable
                onDrag={(event) => this.onDrag(event, todo)}
                >
                {todo.task}
              </div>
            )
          }
        </div>
        <div
          onDrop={event => this.onDrop(event)}
          onDragOver={(event => this.onDragOver(event))}
          className="done"
        >
          {completedTasks.map((task, index) =>
            <div
              key={task.taskID}
            >
              {task.task}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;