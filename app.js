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
  };

  addTodo = () => {
    this.setState(
      ({ todoList }) => ({
        todoList: [
          ...todoList,
          {
            id: new Date().valueOf(),
            text: this.todoInputRef.current.value,
            isDone: false,
          },
        ],
        filterType: 'all',
      }),
      () => {
        this.todoInputRef.current.value = '';
      },
    );
  };

  toggleCompleteTodo = item => {
    const { todoList } = this.state;

    const index = todoList.findIndex(x => x.id === item.id);

    this.setState(state => ({
      todoList: [
        ...state.todoList.slice(0, index),
        { ...item, isDone: !item.isDone },
        ...state.todoList.slice(index + 1),
      ],
    }));
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
    const { todoList, filterType } = this.state;

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
