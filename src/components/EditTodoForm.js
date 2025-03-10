import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task, cancelEdit }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input-edit"
        placeholder="Update task"
      />
      <div className="button-group">
        <button type="submit" className="todo-btn">Update</button>
        <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
};
