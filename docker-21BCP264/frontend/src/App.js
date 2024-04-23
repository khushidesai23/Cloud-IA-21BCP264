import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/todos') // Use the backend service name as the hostname
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);
  

  return (
    <div className="App">
      <h1>Docker Compose Practical</h1>
      <ul>
      <li>Complete Docker tutorial 21BCP264</li>
          <li>Write a blog post about setting up Docker containers</li>
        {/* {todos.map(todo => (
          // <li key={todo.id}>{todo.text}</li>
          
        ))} */}
      </ul>
    </div>
  );
}

export default App;
