const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Taskify Backend',
        version: '1.0.0',
        description: 'This is a REST API made with Express for Taskify.',
        contact: {
            name: 'Github',
            url: 'https://github.com/khajornritdacha/taskify-backend',
        },
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/utils/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec,
};
