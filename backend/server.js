const express = require('express');
const cors = require('cors');
const path = require('path');
const checkItemsRouter = require('./routes/checkItems');
const exportRouter = require('./routes/export');

const app = express();
const PORT = 3001;

// CORS configuration - allow all origins in development
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Uploaded files static serving with proper headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline');
    }
  }
}));

// API routes
app.use('/api', checkItemsRouter);
app.use('/api', exportRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SpecMate AI Backend running on http://0.0.0.0:${PORT}`);
  console.log(`Access from network: http://<server-ip>:${PORT}`);
});
