require('dotenv').config();
const PORT = process.env.PORT || 4000;
// Initialize connection
const db = require('./src/db');
const app = require('./src/app');

app.use('/api', require('./src/routes/apiRotes'));
app.use('/auth', require('./src/routes/authRoutes'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
