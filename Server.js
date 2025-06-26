const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // To serve the HTML file if needed

let documents = [];
let stakeholders = [];
let workflow = [];

// Endpoint to upload a document
app.post('/api/documents', upload.single('file'), (req, res) => {
  const file = req.file;
  documents.push({ name: file.originalname, path: file.path });
  res.json({ success: true, name: file.originalname });
});

// Endpoint to add workflow steps
app.post('/api/workflow', (req, res) => {
  workflow.push(req.body.step);
  res.json({ success: true });
});

// Endpoint to add stakeholders
app.post('/api/stakeholders', (req, res) => {
  stakeholders.push(req.body);
  res.json({ success: true });
});

// Endpoint for analytics/reporting
app.get('/api/analytics', (req, res) => {
  // Example: count documents, stakeholders, and workflow steps
  res.json({
    documentCount: documents.length,
    stakeholderCount: stakeholders.length,
    workflowCount: workflow.length,
    // Add more analytics as needed
  });
});

// For demonstration: simple endpoints to get current state
app.get('/api/documents', (req, res) => res.json(documents));
app.get('/api/workflow', (req, res) => res.json(workflow));
app.get('/api/stakeholders', (req, res) => res.json(stakeholders));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
