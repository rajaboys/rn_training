import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TodoList = ({
  todoList,
  filterType,
  toggleCompleteTodo,
  deleteTodo,
}) => (
  <div className="todo-list-wrapper">
    {todoList
      .filter(x => {
        switch (filterType) {
          case 'completed':
            return x.isDone;

          case 'pending':
            return !x.isDone;

          default:
            return true;
        }
      })
      .map(item => (
        <div key={item.id} className="todo-list">
          <input
            type="checkbox"
            name="isDone"
            checked={item.isDone}
            onChange={() => toggleCompleteTodo(item)}
          />
          <span
            style={{
              textDecoration: item.isDone
                ? 'line-through'
                : 'none',
            }}>
            {item.text}
          </span>
          <button
            type="button"
            onClick={() => deleteTodo(item)}>
            Delete
          </button>
        </div>
      ))}
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  filterType: PropTypes.string.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
