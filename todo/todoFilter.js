import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({ filterType, filterTodo }) => (
  <div className="todo-fliter">
    <button
      style={{
        border:
          filterType === 'all' ? '1px solid red' : 'none',
      }}
      type="button"
      name="all"
      onClick={filterTodo}>
      All
    </button>
    <button
      style={{
        border:
          filterType === 'pending'
            ? '1px solid red'
            : 'none',
      }}
      type="button"
      name="pending"
      onClick={filterTodo}>
      Pending
    </button>
    <button
      type="button"
      style={{
        border:
          filterType === 'completed'
            ? '1px solid red'
            : 'none',
      }}
      name="completed"
      onClick={filterTodo}>
      Completed
    </button>
  </div>
);

TodoFilter.propTypes = {
  filterType: PropTypes.string.isRequired,
  filterTodo: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
