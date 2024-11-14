const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const PORT = 3000;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "https://frontend-navy-ten-94.vercel.app"], // Array of allowed origins
        methods: ['GET', 'POST'],
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    })
);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Products API running new deploy');
});
app.get('/ping', (req, res) => {
    res.send('<=PONG=>');
});
app.get('/country', (req, res) => {
    res.send('<=INDIA=>');
});

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/companies', companyRoutes);

app.listen(PORT, () => {
    console.log('Server is listening on PORT :' + PORT);
});
