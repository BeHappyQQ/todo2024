import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './indexs.css';

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [],
    filter: 'all',
    isTimerOn: false,
  };

  createTask(label, minutes, seconds) {
    return {
      label,
      completed: false,
      id: this.maxId++,
      createdAt: new Date(),
      minutes,
      seconds,
      isTimerRunning: false,
    };
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addTask = (text, minutes, seconds) => {
    const newTask = this.createTask(text, minutes, seconds);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    // update object
    const oldTask = arr[idx];
    const newTask = { ...oldTask, [propName]: !oldTask[propName] };

    //construct new array
    const newArr = [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)];
    return newArr;
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredTasks = () => {
    const { todoData, filter } = this.state;

    if (filter === 'all') {
      return todoData;
    } else if (filter === 'completed') {
      return todoData.filter((task) => task.completed);
    } else if (filter === 'active') {
      return todoData.filter((task) => !task.completed);
    }
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => !task.completed),
    }));
  };

  editTask = (id, newLabel) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => {
        if (task.id === id) {
          return { ...task, label: newLabel };
        }
        return task;
      }),
    }));
  };

  startTimer = (id, minutes, seconds) => {
    const task = this.state.todoData.find((task) => task.id === id);
    if (!task.isTimerRunning) {
      this.setState((prevState) => ({
        todoData: prevState.todoData.map((task) => {
          if (task.id === id) {
            return { ...task, minutes, seconds, isTimerRunning: true };
          }
          return task;
        }),
        isTimerOn: true,
      }));

      this.timerID = setInterval(() => {
        this.setState((prevState) => {
          const idx = prevState.todoData.findIndex((elem) => elem.id === id);
          if (idx === -1) {
            clearInterval(this.timerID);
            return { ...prevState, isTimerOn: false };
          }
          const oldItem = prevState.todoData[idx];
          let newItem = { ...oldItem, seconds: oldItem.seconds - 1 };
          if (newItem.seconds < 0) {
            newItem = { ...newItem, minutes: oldItem.minutes - 1, seconds: 59 };
          }
          if (newItem.seconds === 0 && newItem.minutes === 0) {
            clearInterval(this.timerID);
            return { ...prevState, isTimerOn: false };
          }
          const todoDataCopy = [...prevState.todoData];
          todoDataCopy[idx] = newItem;
          return { todoData: todoDataCopy };
        });
      }, 1000);
    }
  };

  pauseTimer = (id) => {
    clearInterval(this.timerID);
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => (task.id === id ? { ...task, isTimerRunning: false } : task)),
      isTimerOn: false,
    }));
  };

  render() {
    const { todoData, filter } = this.state;

    const completedCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount;
    const filteredTasks = this.getFilteredTasks();

    return (
      <section className="todoapp">
        <AppHeader addTask={this.addTask}></AppHeader>
        <section className="main">
          <TaskList
            todos={filteredTasks}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onToggleDeleted={this.deleteTask}
            onEditTask={this.editTask}
            startTimer={(id, minutes, seconds) => this.startTimer(id, minutes, seconds)}
            pauseTimer={() => this.pauseTimer()}
          />
          <Footer
            todoCount={todoCount}
            filter={filter}
            onFilterChange={this.changeFilter}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
