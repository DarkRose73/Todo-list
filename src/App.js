import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const initialTodos = [
  {
    id: 1,
    title: "Todo numero 1",
    description: "Descripcion todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "Todo numero 2",
    description: "Descripcion todo 2",
    completed: true,
  },
];

const localTodos = JSON.parse(localStorage.getItem("todos"));

const App = () => {
  //Retorna un arreglo con dos posiciones
  //la primera posicion es el estado en si mismo
  //la segunda posicion es una funcion para actualizar el estado
  const [todos, setTodos] = useState(localTodos || initialTodos);
  const [todoEdit, setTodoEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const todoDelete = (todoId) => {
    // if (todoEdit) {
    //   if (todoId === todoEdit.id) {
    //     setTodoEdit(null);
    //   }
    // }
    if (todoEdit && todoId === todoEdit.id) {
      setTodoEdit(null);
    }
    const changedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(changedTodos);
  };

  const todoToggleCompleted = (todoId) => {
    // const changedTodos = todos.map((todo) => {
    //   const todoEdit = {
    //     ...todo,
    //     completed: !todo.completed,
    //   };

    //   if (todo.id == todoId) {
    //     return todoEdit;
    //   } else return todo;
    // });

    const changedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );

    // const changedTodos = todos.map((todo) =>
    //   todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    // );

    setTodos(changedTodos);
  };

  const todoAdd = (todo) => {
    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false,
    };
    const changedTodos = [newTodo, ...todos];

    setTodos(changedTodos);
  };

  const todoUpdate = (todoEdit) => {
    const changedTodos = todos.map((todo) =>
      todo.id === todoEdit.id ? todoEdit : todo
    );

    setTodos(changedTodos);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-8">
          <TodoList
            todoDelete={todoDelete}
            todoToggleCompleted={todoToggleCompleted}
            setTodoEdit={setTodoEdit}
            todos={todos}
          />
        </div>
        <div className="col-4">
          <TodoForm
            todoAdd={todoAdd}
            todoUpdate={todoUpdate}
            setTodoEdit={setTodoEdit}
            todoEdit={todoEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
