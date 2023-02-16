const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const characterRoutes = require('./routes/character');
const userRoutes = require('./routes/user');
const blizzardRoutes = require('./routes/blizzard');

const app = express();

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose
    .connect(
        'mongodb+srv://Thomas:Thomas@backend-evaluation.jnypsxq.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(() => console.log('Connexion à MongoDB échouée'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/blizzard', blizzardRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/auth', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;