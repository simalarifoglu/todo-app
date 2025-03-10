import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons"; // free-regular yerine free-solid kullandık
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className={`Todo todo-item ${task.removing ? "removing" : ""}`}>
      <FontAwesomeIcon
        className={`check-icon ${task.completed ? "checked" : ""}`}
        icon={task.completed ? faCheckCircle : faCircle}
        onClick={() => toggleComplete(task.id)}
      />

      <p
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.task}
      </p>
   
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};
