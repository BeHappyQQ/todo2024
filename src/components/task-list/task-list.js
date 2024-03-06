import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

const TaskList = ({ todos, onDeleted, onToggleCompleted, onToggleDeleted, onEditTask }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleDeleted={() => onToggleDeleted(id)}
        onEditTask={(newLabel) => onEditTask(id, newLabel)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleDeleted: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleDeleted: () => {},
  onEditTask: () => {},
};

export default TaskList;
