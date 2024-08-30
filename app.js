const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'To-Do List API',
            version: '1.0.0',
            description: 'API for managing a simple to-do list <br> by Paula Emad',
        },

        servers: [
            {
                url: `http://localhost:${PORT}/`,
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/tasks', taskRoutes);

app.use('/tasks', require('./routes/tasks')); 

module.exports = app; 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
