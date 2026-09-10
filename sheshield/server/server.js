const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.listen(PORT, () => {
  console.log(`Sheshield 2.0 Backend running on port ${PORT}`);
});
