import React, { useState } from "react";

function TodoInput({ addTodo }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, status);
      setText("");
      setStatus("pending");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      justifyContent: 'center'
    }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: '10px',
          flex: 1,
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      >
        <option value="pending">Pending</option>
        <option value="in-process">In Process</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" style={{
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 16px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        Add Task
      </button>
    </form>
  );
}

export default TodoInput;
