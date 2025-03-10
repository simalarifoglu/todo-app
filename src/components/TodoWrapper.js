import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [showInput, setShowInput] = useState(false); // Input görünürlüğü kontrolü
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5; // Her sayfada gösterilecek görev sayısı
  const [isEditing, setIsEditing] = useState(false);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false, removing: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, removing: true } : todo
      )
    );

    setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, 300);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // **Cancel Butonu Çalıştıran Fonksiyon**
  const cancelEdit = () => {
    setTodos(todos.map(todo => ({ ...todo, isEditing: false }))); // Tüm düzenlemeleri iptal et
    setIsEditing(false);
    setShowInput(false);
  };

  // **SAYFALAMA MANTIĞI**
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  return (
    <div className="TodoWrapper">
      {/* Add Task Butonu */}
      <button className="add-task-btn" onClick={() => setShowInput(!showInput)}>
        {showInput ? "Cancel" : "Add Task"}
      </button>

      {/* Eğer edit modundaysa Cancel butonu gözüksün */}
      {isEditing && (
        <button className="cancel-btn" onClick={cancelEdit}>
          Cancel
        </button>
      )}

      <h1>To-Do List</h1>

      {/* Input Formu Sadece Butona Basıldığında Görünecek */}
      {showInput && <TodoForm addTodo={addTodo} />}

      {/* Görevleri göster */}
      {currentTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}

      {/* Sayfalama Kontrolleri */}
      {todos.length > todosPerPage && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

