const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Use CORS middleware



const app = express();
const port = 4000;

const pool = new Pool({
  user: 'admin',
  host: 'db',
  database: 'todo_db',
  password: 'password',
  port: 5432,
});

const todoData = {
  title: 'Complete Docker tutorial',
  description: 'Write a blog post about setting up Docker containers',
  completed: false,
};

const insertQuery = `
  INSERT INTO todos (title, description, completed)
  VALUES ($1, $2, $3)
  RETURNING *
`;

pool.query(insertQuery, [todoData.title, todoData.description, todoData.completed], (err, result) => {
  if (err) {
    console.error('Error inserting data:', err);
  } else {
    console.log('Data inserted successfully:', result.rows[0]);
  }

});



app.get('/api/todos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.use(cors());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
