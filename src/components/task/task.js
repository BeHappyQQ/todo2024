import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = ({
  label,
  completed,
  onToggleCompleted,
  onToggleDeleted,
  onEditTask,
  startTimer,
  pauseTimer,
  minutes,
  seconds,
  createdAt,
  id,
}) => {
  const [editing, setEditing] = useState(false);
  const [editingLabel, setEditingLabel] = useState(label);

  useEffect(() => {
    startTimer(id);
    return () => pauseTimer();
  }, []);

  const editClick = () => {
    setEditing(true);
  };

  const onInputChange = (event) => {
    setEditingLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onEditTask(editingLabel);
    setEditing(false);
  };

  const onTimerStart = (id, minutes, seconds) => {
    startTimer(id, minutes, seconds);
  };

  const onTimerPause = (id) => {
    pauseTimer(id);
  };

  let classNames = 'title';
  if (completed) {
    classNames += ' completed';
  }

  const distance = formatDistanceToNow(new Date(createdAt));

  return (
    <li className={completed ? 'completed' : editing ? 'editing' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
        <label>
          <span className={classNames}>{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onTimerStart}></button>
            <button className="icon icon-pause" onClick={onTimerPause}></button>
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </span>
          <span className="description">created {distance} ago</span>
        </label>
        <button className="icon icon-edit" onClick={editClick}></button>
        <button className="icon icon-destroy" onClick={onToggleDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={onInputChange} value={editingLabel} autoFocus />
      </form>
    </li>
  );
};

export default Task;

Task.propTypes = {
  label: PropTypes.string,
  completed: PropTypes.bool,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleDeleted: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date),
  onEditTask: PropTypes.func.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
};

Task.defaultProps = {
  label: '',
  completed: false,
  onToggleCompleted: () => {},
  onToggleDeleted: () => {},
  createdAt: new Date(),
  onEditTask: () => {},
  minutes: 0,
  seconds: 0,
  startTimer: () => {},
  pauseTimer: () => {},
};
