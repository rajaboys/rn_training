import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

const TodoForm = forwardRef(({ addTodo }, ref) => (
  <div className="todo-form">
    <input type="text" ref={ref} />
    <button type="button" onClick={addTodo}>
      Add Todo
    </button>
  </div>
));

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default memo(TodoForm);
