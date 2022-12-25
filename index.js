require('dotenv').config();
const PORT = process.env.PORT || 4000;
// Initialize connection
const db = require('./src/configs/db.config');
const app = require('./src/app');
require('./src/models/Todo');
require('./src/models/User');

app.use('/api', require('./src/routes/apiRotes'));
app.use('/auth', require('./src/routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
