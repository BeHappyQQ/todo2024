import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addTask }) => {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  NewTaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
  };

  NewTaskForm.defaultProps = {
    addTask: () => {},
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onMinutesChange = (event) => {
    let minutes = event.target.value.replace(/\D/, '');
    minutes = Math.min(parseInt(minutes, 10), 59);
    setMinutes(minutes);
  };

  const onSecondsChange = (event) => {
    let seconds = event.target.value.replace(/\D/, '');
    seconds = Math.min(parseInt(seconds, 10), 59);
    setSeconds(seconds);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addTask(label, minutes, seconds);
    setLabel('');
    setMinutes('');
    setSeconds('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" placeholder="Task" onChange={onLabelChange} autoFocus value={label} />
      <input
        className="new-todo-form__timer"
        placeholder="min"
        maxLength="2"
        value={minutes}
        onChange={onMinutesChange}
        onKeyDown={handleKeyDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="sec"
        maxLength="2"
        value={seconds}
        onChange={onSecondsChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default NewTaskForm;
