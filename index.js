const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const PORT =  3000;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors({
    origin: "https://authentication-frontend-phi.vercel.app/",  // Corrected URL to use http://
    credentials: true                // Corrected key to 'credentials'
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('products api running new deploy');
});
app.get('/ping', (req, res) => {
    res.send('<=PONG=>');
});
app.get('/country', (req, res) => {
    res.send('<=INDIA=>');
});

// /products
app.use('/products', productRoutes);
// /users
app.use('/users', userRoutes);

app.use('/admins', adminRoutes);
app.use('/companies', companyRoutes);

app.listen(3000, () => {
    console.log('Server is listening on PORT :' + PORT);
});
