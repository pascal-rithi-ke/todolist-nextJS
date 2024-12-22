"use client"
import React, { useState } from "react";

export default function Home() {
  type Todo = {
    title: string;
    completed: boolean;
  };

// ADD
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  function addTodo(){
    if(newTask.trim() !== ""){
      const newTodo: Todo = {title: newTask, completed: false};
      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  }

  function onChange(event : React.ChangeEvent<HTMLInputElement>){
    setNewTask(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

// DELETE
  function removeTodo(indexToRemove: number) {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  }

// UPDATE
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [updatedTask, setUpdatedTask] = useState<string>("");

  function updateTodo(indexToUpdate: number, newTitle: string) {
    setTodos(todos.map((todo, index) => 
      index === indexToUpdate ? { ...todo, title: newTitle } : todo
    ));
  }

  return (
    <div className="container">
      <div className="todolist">
        <input id="task-name" placeholder="Task Name" value={newTask} onChange={onChange} onKeyDown={handleKeyDown}></input>
        <button id="submit-btn" type="submit" onClick={addTodo}>Validation</button>
      </div>
      
      <ul className="list-content">
        <p className="text-xl">Task</p>
        {todos.map((todo, index) => (
          <li key={index} className="flex">
            <p onClick={() => removeTodo(index)} className="action-btn">❌</p>
            {editingIndex === index ? (
              <>
                <input
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  placeholder="New task name"
                />
                <button onClick={() => {
                  updateTodo(index, updatedTask);
                  setEditingIndex(null);
                  setUpdatedTask("");
                }}>✔</button>
                <button onClick={() => setEditingIndex(null)}>✖</button>
              </>
            ) : (
              <>
                <p onClick={() => {
                  setEditingIndex(index);
                  setUpdatedTask(todo.title);
                }} className="action-btn">📝</p>
                <p>Name : {todo.title}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
