// server.js
const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Get all users
app.get('/users', (req, res) => res.json(users));

// Get user by id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const u = users.find(x => x.id === id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
});

// Create user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const before = users.length;
  users = users.filter(u => u.id !== id);
  if (users.length === before) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
