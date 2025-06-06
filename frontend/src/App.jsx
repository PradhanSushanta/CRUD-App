import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  const getTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/todos/${editId}`, { text });
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/todos', { text });
    }
    setText('');
    getTodos();
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditId(todo._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    getTodos();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo App</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>{editId ? 'Update' : 'Add'}</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
