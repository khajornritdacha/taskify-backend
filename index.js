require('dotenv').config();
const PORT = process.env.PORT || 4000;
// Initialize connection
const db = require('./src/configs/db.config');
const app = require('./src/app');
require('./src/models/Todo');
require('./src/models/User');

const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./src/configs/swagger.config');

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    return res.redirect('/api-docs');
});

app.use('/api', require('./src/routes/apiRotes'));
app.use('/auth', require('./src/routes/authRoutes'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
