const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const PORT =  8080;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
app.use(express.json());

app.get('/', (req, res) => {
    res.send('products api running new deploy');
});
app.get('/ping', (req, res) => {
    res.send('<=PONG=>');
});
app.get('/country', (req, res) => {
    res.send('<=INDIA=>');
});

app.get('/ping', (req, res) => {
    res.send('PONG')
});
// /products
app.use('/products', productRoutes);
// /users
app.use('/users', userRoutes);

app.use('/admins', adminRoutes)

app.listen(8080, () => {
    console.log('Server is listenin on PORT :' + PORT);
})
