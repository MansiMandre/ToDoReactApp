import React from 'react';

const getColumnColor = (status) => {
  switch (status) {
    case 'pending':
      return '#fff9c4'; // light yellow
    case 'in-process':
      return '#ffe0b2'; // light orange
    case 'completed':
      return '#c8e6c9'; // light green
    default:
      return '#ffffff';
  }
};

function TodoList({ todos, status, updateStatus }) {
  const filteredTodos = todos.filter(todo => todo.status === status);
  const bgColor = getColumnColor(status);

  return (
    <div style={{
      flex: 1,
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
          <li key={todo.id} style={{
            marginBottom: '15px',
            backgroundColor: '#ffffff',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            borderLeft: `5px solid ${status === 'completed' ? '#4caf50' : status === 'in-process' ? '#ff9800' : '#ffeb3b'}`,
          }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>{todo.text}</strong>
            </div>
            <div>
              <label>
                Status:&nbsp;
                <select
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
                </select>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
