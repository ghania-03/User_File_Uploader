const express = require('express');
const path = require('path');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// For uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', fileRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
