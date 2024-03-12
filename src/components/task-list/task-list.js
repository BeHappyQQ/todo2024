import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

const TaskList = ({ todos, onDeleted, onToggleCompleted, onToggleDeleted, onEditTask, startTimer, pauseTimer }) => {
  const elements = todos.map((item) => {
    const { id, minutes, seconds, ...itemProps } = item;
    return (
      <Task
        key={id}
        {...itemProps}
        minutes={minutes}
        seconds={seconds}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleDeleted={() => onToggleDeleted(id)}
        onEditTask={(newLabel) => onEditTask(id, newLabel)}
        startTimer={() => startTimer(id, minutes, seconds)}
        pauseTimer={() => pauseTimer(id)}
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
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleDeleted: () => {},
  onEditTask: () => {},
  onStartTimer: () => {},
  onPauseTimer: () => {},
};

export default TaskList;
