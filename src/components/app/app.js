import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";
import "./indexs.css"

export default class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createTask("test"),
      this.createTask("test2"),
      this.createTask("test3")
    ],
    filter: "all"
  };

  createTask(label) {
    return {
        label,
        completed: false,
        id: this.maxId++,
        createdAt: new Date()
    }


  };

  deleteTask = (id) => {

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx+1)
      ]

      return {
        todoData: newArray
      }

    })
  };

  addTask = (text) => {
    const newTask = this.createTask(text)

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newTask
      ];

      return {
        todoData: newArr
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

      // update object
    const oldTask = arr[idx];
    const newTask = {...oldTask, 
                    [propName]: !oldTask[propName]}

      //construct new array
    const newArr = [
      ...arr.slice(0, idx),
      newTask,
      ...arr.slice(idx+1)
    ];
    return newArr;
  }


  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "completed")
      };
    });
  };

  changeFilter = (filter) => {
    this.setState ({filter});
  };

  getFilteredTasks = () => {
    const { todoData, filter } = this.state;

    if (filter === "all") {
      return todoData;
    }
    else if (filter === "completed") {
      return todoData.filter((task) => task.completed)
    }
    else if (filter === "active") {
      return todoData.filter((task) => !task.completed)
    }
  }

  clearCompleted = () => {
    this.setState(({todoData}) => ({
      todoData: todoData.filter((task) => !task.completed)
    }))

  }

  editTask = (id, newLabel) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map(task => {
        if (task.id === id) {
          return {...task, label: newLabel};
        }
        return task;
      })
    }))
  }


  


  render() {
    const { todoData, filter } = this.state;

    const completedCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount;
    const filteredTasks = this.getFilteredTasks();

    
 
   return (
     <section className="todoapp">
       <AppHeader addTask = {this.addTask}></AppHeader>
       <section className="main">
          <TaskList 
          todos={filteredTasks}
          onDeleted = {this.deleteTask}
          onToggleCompleted = {this.onToggleCompleted}
          onToggleDeleted = {this.deleteTask}
          onEditTask = {this.editTask}/>
          <Footer todoCount={todoCount}
                  filter = {filter}
                  onFilterChange= {this.changeFilter}
                  onClearCompleted={this.clearCompleted}
          />
       </section>
     </section>
   );
 };

}

