import React from "react";
import NewTaskForm from "../new-task-form/new-task-form"; 
import PropTypes from "prop-types"

const AppHeader = ({addTask}) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm addTask = {(text) => addTask(text)}/>
        </header>
    )
}

AppHeader.propTypes = {
    addTask: PropTypes.func.isRequired,
  };

AppHeader.defaultProps = {
    addTask: () => {},
}

export default AppHeader;