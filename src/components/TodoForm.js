import React, { useState, useEffect } from "react";

const initialFormValues = {
  title: "",
  description: "",
};

const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { title, description } = formValues;
  const [error, setError] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);
  useEffect(() => {
    if (todoEdit) {
      setFormValues(todoEdit);
    } else {
      setFormValues(initialFormValues);
    }
  }, [todoEdit]);

  const handleInputChange = (event) => {
    const changedFormValues = {
      ...formValues,
      [event.target.name]: event.target.value,
    };

    setFormValues(changedFormValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Debes indicar un titulo");
      return;
    }
    if (description.trim() === "") {
      setError("Debes indicar una descripción");
      return;
    }

    //todoEdit es distinto de null?
    if (todoEdit) {
      //Actualizando
      todoUpdate(formValues);
      setSucessMessage("Actualizado con éxito");
    } else {
      //Agregando
      todoAdd(formValues);
      setSucessMessage("Agregado con éxito");
      setFormValues(initialFormValues);
    }

    setTimeout(() => {
      setSucessMessage(null);
    }, 2000);
    setError(null);
  };

  return (
    <div>
      <h2 className="text-center display-5">
        {todoEdit ? "Editar tarea" : "Nueva tarea"}
      </h2>

      {todoEdit && (
        <button
          className="btn btn-sm btn-warning mb-2"
          onClick={() => {
            setTodoEdit(null);
            setFormValues(initialFormValues);
          }}
        >
          Cancelar edición
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Titulo"
          value={title}
          // Name debe tener el mismo nombre que la propiedad del objeto initialFormValues
          name="title"
          onChange={handleInputChange}
        ></input>

        <textarea
          placeholder="Descripcion"
          className="form-control mt-2"
          value={description}
          onChange={handleInputChange}
          name="description"
        ></textarea>

        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-block mt-2">
            {todoEdit ? "Actualizar tarea" : "Agregar tarea"}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {sucessMessage && (
        <div className="alert alert-success mt-2">{sucessMessage}</div>
      )}
    </div>
  );
};

export default TodoForm;
