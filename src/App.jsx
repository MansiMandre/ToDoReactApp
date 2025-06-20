import React, { useState, useEffect, useRef } from 'react';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';
import { Confetti } from '@neoconfetti/react';
import { motion } from 'framer-motion';

const LOCAL_STORAGE_KEY = 'react-task-board';

function App() {
  const [todos, setTodos] = useState([]);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
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
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.status === 'completed');

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        backgroundImage:
          'url("https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>
        🧾 Task Board
      </h1>

      <TodoInput addTodo={addTodo} />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        <TodoList todos={todos} status="pending" updateStatus={updateStatus} />
        <TodoList todos={todos} status="in-process" updateStatus={updateStatus} />
        <TodoList todos={todos} status="completed" updateStatus={updateStatus} />
      </div>

      {allCompleted && (
        <>
          {/* Fullscreen Confetti Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            <Confetti
              particleCount={400}
              force={0.8}
              duration={4000}
              colors={['#FFC700', '#FF0000', '#2E3192', '#41BBC7']}
              shapes={['circle', 'square', 'triangle', 'line']}
              gravity={0.3}
            />
          </div>

          {/* Congratulatory Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              fontSize: 'clamp(18px, 2vw, 24px)', // responsive font size
              fontWeight: 'bold',
              color: '#4caf50',
              marginTop: '30px',
              position: 'relative', // to appear above confetti
              zIndex: 10000,
            }}
          >
            🎉 Congratulations! All tasks are completed!
          </motion.div>

          {/* Clear Completed Tasks Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <motion.button
              onClick={clearAllTodos}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: 'clamp(8px, 1vw, 12px) clamp(15px, 3vw, 20px)', // responsive padding
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 'clamp(14px, 1.5vw, 16px)', // responsive font size
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 10000,
              }}
            >
              ✅ Clear All Completed Tasks
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
