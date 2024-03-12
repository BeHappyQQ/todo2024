import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  static propTypes = {
    addTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    addTask: () => {},
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onMinutesChange = (event) => {
    let minutes = event.target.value.replace(/\D/, '');
    minutes = Math.min(parseInt(minutes, 10), 59);
    this.setState({ minutes });
  };

  onSecondsChange = (event) => {
    let seconds = event.target.value.replace(/\D/, '');
    seconds = Math.min(parseInt(seconds, 10), 59);
    this.setState({ seconds });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { label, minutes, seconds } = this.state;
    this.props.addTask(label, minutes, seconds);
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit(event);
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="Task" onChange={this.onLabelChange} autoFocus value={label} />
        <input
          className="new-todo-form__timer"
          placeholder="min"
          maxLength="2"
          value={minutes}
          onChange={this.onMinutesChange}
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="sec"
          maxLength="2"
          value={seconds}
          onChange={this.onSecondsChange}
          onKeyDown={this.handleKeyDown}
        />
      </form>
    );
  }
}
