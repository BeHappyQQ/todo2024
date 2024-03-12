import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    createdAt: this.props.createdAt,
    editing: false,
    editedLabel: this.props.label,
  };

  static propTypes = {
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

  static defaultProps = {
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

  editClick = () => {
    this.setState({ editing: true });
  };

  onInputChange = (event) => {
    this.setState({ editedLabel: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onEditTask(this.state.editedLabel);
    this.setState({ editing: false });
  };

  // componentDidMount() {
  //   this.timerID = setInterval(() => {
  //     this.setState({
  //       createdAt: this.props.createdAt,
  //     });
  //   }, 60000);
  // }

  startTimer = () => {
    const { id, minutes, seconds, startTimer } = this.props;
    startTimer(id, minutes, seconds);
  };

  pauseTimer = () => {
    const { pauseTimer } = this.props;
    pauseTimer();
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.pauseTimer();
  }

  render() {
    const { label, completed, onToggleCompleted, onToggleDeleted, createdAt, minutes, seconds } = this.props;
    const { editing, editedLabel } = this.state;

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
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button className="icon icon-pause" onClick={this.pauseTimer}></button>
              {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </span>
            <span className="description">created {distance} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.editClick}></button>
          <button className="icon icon-destroy" onClick={onToggleDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.onInputChange} value={editedLabel} autoFocus />
        </form>
      </li>
    );
  }
}
