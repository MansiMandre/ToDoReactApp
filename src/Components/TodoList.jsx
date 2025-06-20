import React from 'react';
import { motion } from 'framer-motion';

const getColumnColor = (status) => {
  switch (status) {
    case 'pending': return '#fff9c4';
    case 'in-process': return '#ffe0b2';
    case 'completed': return '#c8e6c9';
    default: return '#ffffff';
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function TodoList({ todos, status, updateStatus }) {
  const filteredTodos = todos.filter(todo => todo.status === status);
  const bgColor = getColumnColor(status);

  return (
    <div style={{
      flex: '1 1 300px',
      minWidth: '280px',
      padding: '15px',
      backgroundColor: bgColor,
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      minHeight: '300px'
    }}>
      <h2 style={{ textTransform: 'capitalize', textAlign: 'center' }}>
        {status.replace('-', ' ')}
      </h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map(todo => (
          <motion.li
            key={todo.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              marginBottom: '15px',
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              borderLeft: `5px solid ${
                status === 'completed' ? '#4caf50' :
                status === 'in-process' ? '#ff9800' : '#ffeb3b'
              }`
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <strong>{todo.text}</strong>
            </div>
            <div>
              <label>
                Status:&nbsp;
                <motion.select
                  whileTap={{ scale: 1.05 }}
                  value={todo.status}
                  onChange={(e) => updateStatus(todo.id, e.target.value)}
                  style={{
                    padding: '6px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-process">In Process</option>
                  <option value="completed">Completed</option>
                </motion.select>
              </label>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
