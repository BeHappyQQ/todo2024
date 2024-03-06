import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/tasks-filter';

const Footer = ({ todoCount, filter, onFilterChange, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todoCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  todoCount: 0,
  filter: 'all',
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

export default Footer;
