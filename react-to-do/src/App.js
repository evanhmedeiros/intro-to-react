import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = { // state is always an object
      todos: [
        // property: 'string value', property: boolean
        { description: 'Walk the cat', isCompleted: true },
        { description: 'Throw away the dishes', isCompleted: false },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newTodoDescription: ''
    };

    this.deleteTodo = this.deleteTodo.bind(this)

  }

  

  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value })
  }

  handleSubmit(e) {// submitting new todos
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }

  toggleComplete(index) {// checkbox on/off
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

  deleteTodo(index) {
    const todos =  this.state.todos.filter(r => r.isCompleted !== true);
    this.setState({todos: todos});
  }

  render() {
    return (

     <div className="App">
      <ul>
        { this.state.todos.map( (todo, index) => 
          <ToDo key={ index } description={ todo.description } deleteTodo={this.deleteTodo} isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) } /> 
        )
      }
      </ul>
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
        <input type="submit"/>
      </form>
     </div>
    );
  }
}

export default App;
