import React, { PureComponent, createRef } from 'react';
import './app.scss';
import TodoFilter from './todo/todoFilter';
import TodoForm from './todo/todoForm';
import TodoList from './todo/todoList';

class App extends PureComponent {
  todoInputRef = createRef(null);

  state = {
    todoList: [],
    filterType: 'all',
    hasError: false,
  };

  componentDidMount = async () => {
    try {
      const res = await fetch(
        'http://localhost:3000/todoList',
      );
      const json = await res.json();
      console.log('res', res);
      console.log('json', json);
      this.setState({
        todoList: json,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
      console.log(error);
    }
  };

  addTodo = async () => {
    try {
      const res = await fetch(
        'http://localhost:3000/todoList',
        {
          method: 'POST',
          body: JSON.stringify({
            text: this.todoInputRef.current.value,
            isDone: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await res.json();

      this.setState(
        ({ todoList }) => ({
          todoList: [...todoList, json],
          filterType: 'all',
        }),
        () => {
          this.todoInputRef.current.value = '';
        },
      );
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }
  };

  toggleCompleteTodo = async item => {
    try {
      const res = await fetch(
        `http://localhost:3000/todoList/${item.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...item,
            isDone: !item.isDone,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await res.json();

      const { todoList } = this.state;

      const index = todoList.findIndex(
        x => x.id === item.id,
      );

      this.setState(state => ({
        todoList: [
          ...state.todoList.slice(0, index),
          json,
          ...state.todoList.slice(index + 1),
        ],
      }));
    } catch (error) {
      console.log(error);
      this.setState({
        hasError: true,
      });
    }
  };

  deleteTodo = item => {
    this.setState(({ todoList }) => ({
      todoList: todoList.filter(x => x.id !== item.id),
    }));
  };

  filterTodo = event => {
    this.setState({
      filterType: event.target.name,
    });
  };

  render() {
    const { todoList, filterType, hasError } = this.state;

    if (hasError) {
      return (
        <h1>
          Server is down. Please try after sometime...
        </h1>
      );
    }

    return (
      <div className="container">
        <h1>Todo App</h1>
        <TodoForm
          ref={this.todoInputRef}
          addTodo={this.addTodo}
        />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          toggleCompleteTodo={this.toggleCompleteTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter
          filterType={filterType}
          filterTodo={this.filterTodo}
        />
      </div>
    );
  }
}

export default App;

// life cycle methods

// mounting

// 1. Constructor
// -> 1. based on props define new state value
// -> 2. to make api call (cant set state base on response)
// -> 3. calls only once
// -> 4. bind the methods

// 2. getDerivedStateFromProps

// -> to derived new state base on state and props both
// -> calls everytime when prop or state value change

// 3. render
// -> to render html in dome

// 4. component did mount
// -> on page load get data
// -> to add event listners
// -> to update dom element

// updating

// 1. getDerivedStateFromProps
// 2. shouldComponentUpdate / Inherit PureComponent
// -> to avoid unnessasary rerending base on parent componment update

// 3. render

// 4. getSnapShoptBeforUpdate
// -> take snapshot of UI and pass result to ComponentDidUpdate

// 5. componentDidIUpdate
// -> manipulate the dom base on update

// unmoiunting

// 1. componentWillUnmount
// -> remove eventListenrem, remove interval or timeout, cancel API calls

// error

// 1. GetDerivedStateFromError
// -> derive state value based on error

// 2. componentDidCatch
// log error on server
