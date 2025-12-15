require('dotenv').config();

const express = require('express');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');


const app = express();
app.use(express.json());


// User routes
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', userController.getUsers);

// Rotas de transferência protegidas por JWT
app.post('/transfer', authenticateToken, transferController.transfer);
app.get('/transfers', authenticateToken, transferController.getTransfers);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
