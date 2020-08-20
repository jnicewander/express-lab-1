'use strict';
const express = require('express');
const app = express();
const cartItems = require('./cart-items');
const expressShopDB = require('./express-shop-db');
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/', expressShopDB)
app.use('/cart-items', cartItems);

app.get('*', (req, res) => {
    res.status(201);
    res.json({message: 'These are not the resources you\'re looking for. Move along.'});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});