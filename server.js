// server.js
const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Arun Kumar", age: 28, city: "Chennai", job: "Software Engineer" },
  { id: 2, name: "Priya Raj", age: 26, city: "Coimbatore", job: "Data Analyst" },
  { id: 3, name: "Karthik S", age: 30, city: "Madurai", job: "Project Manager" },
  { id: 4, name: "Divya Lakshmi", age: 24, city: "Trichy", job: "UI/UX Designer" },
  { id: 5, name: "Vignesh M", age: 29, city: "Salem", job: "Backend Developer" },
  { id: 6, name: "Anitha Devi", age: 27, city: "Tirunelveli", job: "QA Engineer" },
  { id: 7, name: "Surya Narayanan", age: 32, city: "Erode", job: "DevOps Engineer" },
  { id: 8, name: "Meena Shree", age: 25, city: "Thanjavur", job: "Frontend Developer" },
  { id: 9, name: "Rajesh Kumar", age: 31, city: "Vellore", job: "System Administrator" },
  { id: 10, name: "Lakshmi Priya", age: 23, city: "Tuticorin", job: "Intern Developer" }
];

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Get all users
app.get('/users', (req, res) => res.json(users));

// Get user by id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Create user (POST)
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, name };
  users.push(newUser);

  res.status(201).json(newUser);
});

// Update user (PUT)
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return res.status(404).json({ error: "User not found" });

  if (!name) return res.status(400).json({ error: "Name is required for update" });

  users[userIndex].name = name;

  res.json(users[userIndex]);
});

// Delete user (DELETE)
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const oldLength = users.length;
  users = users.filter(u => u.id !== id);

  if (users.length === oldLength) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
