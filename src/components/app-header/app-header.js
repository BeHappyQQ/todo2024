import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form/new-task-form';

const AppHeader = ({ addTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addTask={(text, minutes, seconds) => addTask(text, minutes, seconds)} />
    </header>
  );
};

AppHeader.propTypes = {
  addTask: PropTypes.func.isRequired,
};

AppHeader.defaultProps = {
  addTask: () => {},
};

export default AppHeader;
