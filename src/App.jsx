import React, { useState, useEffect, useRef } from 'react';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';

const LOCAL_STORAGE_KEY = 'react-task-board';

function App() {
  const [todos, setTodos] = useState([]);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log('Loaded todos from localStorage:', storedTodos);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, status = 'pending') => {
    const newTodo = {
      id: Date.now(),
      text,
      status,
    };
    setTodos([newTodo, ...todos]);
  };

  const updateStatus = (id, newStatus) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const clearAllTodos = () => {
    setTodos([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log('All todos cleared and localStorage updated.');
  };

  return (
    <div style={{
      padding: '30px',
      fontFamily: 'Inter, sans-serif',
      minHeight: '100vh',
      backgroundImage: 'url("https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>🧾 Task Board</h1>

      <TodoInput addTodo={addTodo} />

      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '30px',
        alignItems: 'flex-start'
      }}>
        <TodoList todos={todos} status="pending" updateStatus={updateStatus} />
        <TodoList todos={todos} status="in-process" updateStatus={updateStatus} />
        <TodoList todos={todos} status="completed" updateStatus={updateStatus} />
      </div>

      {/* ✅ Clear button shows only if all tasks are completed */}
      {todos.length > 0 && todos.every(todo => todo.status === 'completed') && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={clearAllTodos}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            ✅ Clear All Completed Tasks
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
