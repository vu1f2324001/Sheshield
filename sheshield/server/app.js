const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    status: 'Sheshield 2.0 API Server is Online',
    frontendUrl: 'Please open Port 5173 for the User Interface'
  });
});

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/schemes', require('./routes/schemeRoutes'));
app.use('/api/v1/ai', require('./routes/aiRoutes'));

module.exports = app;
