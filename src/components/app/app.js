/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './indexs.css';

const App = () => {
  let maxId = 1;

  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isTimerOn, setTimerOn] = useState(false);

  const createTask = (label, minutes, seconds) => {
    return {
      label,
      completed: false,
      id: maxId++,
      createdAt: new Date(),
      minutes,
      seconds,
      isTimerRunning: true,
    };
  };

  const deleteTask = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };

  const addTask = (text, minutes, seconds) => {
    const newTask = createTask(text, minutes, seconds);
    setTodoData((prevTodoData) => [...prevTodoData, newTask]);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldTask = arr[idx];
    const newTask = { ...oldTask, [propName]: !oldTask[propName] };

    const newArr = [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)];
    return newArr;
  };

  const onToggleCompleted = (id) => {
    setTodoData(toggleProperty(todoData, id, 'completed'));
  };

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const getFilteredTasks = () => {
    if (filter === 'all') {
      return todoData;
    } else if (filter === 'completed') {
      return todoData.filter((task) => task.completed);
    } else if (filter === 'active') {
      return todoData.filter((task) => !task.completed);
    }
  };

  const clearCompleted = () => {
    setTodoData(todoData.filter((task) => !task.completed));
  };

  const editTask = (id, newLabel) => {
    const newArr = todoData.map((task) => {
      if (task.id === id) {
        return { ...task, label: newLabel };
      }
      return task;
    });
    setTodoData(newArr);
  };

  const startTimer = (id, minutes, seconds) => {
    setTimerOn(true);
  };

  const pauseTimer = () => {
    setTimerOn(false);
  };

  useEffect(() => {
    let timerID;

    const runTimer = () => {
      timerID = setInterval(() => {
        setTodoData((prevTodoData) =>
          prevTodoData.map((task) => {
            if (task.isTimerRunning) {
              let updatedMinutes = task.minutes;
              let updatedSeconds = task.seconds - 1;

              if (updatedSeconds < 0) {
                updatedMinutes -= 1;
                updatedSeconds = 59;
              }

              if (updatedMinutes === 0 && updatedSeconds === 0) {
                return { ...task, isTimerRunning: false };
              }

              return { ...task, minutes: updatedMinutes, seconds: updatedSeconds };
            }
            return task;
          })
        );
      }, 1000);
    };

    const clearTimer = () => {
      clearInterval(timerID);
    };

    if (isTimerOn) {
      runTimer();
    } else {
      clearTimer();
    }

    return () => {
      clearTimer();
    };
  }, [isTimerOn]);

  const completedCount = todoData.filter((el) => el.completed).length;
  const todoCount = todoData.length - completedCount;
  const filteredTasks = getFilteredTasks();

  return (
    <section className="todoapp">
      <AppHeader addTask={addTask}></AppHeader>
      <section className="main">
        <TaskList
          todos={filteredTasks}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onToggleDeleted={deleteTask}
          onEditTask={editTask}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
        <Footer todoCount={todoCount} filter={filter} onFilterChange={changeFilter} onClearCompleted={clearCompleted} />
      </section>
    </section>
  );
};

export default App;
