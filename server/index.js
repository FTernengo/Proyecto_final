// server/index.js

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const emailRoutes = require('./routes/email');
const itemRoutes = require('./routes/items');

app.use('/api/email', emailRoutes);
app.use('/api/items', itemRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('home');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

