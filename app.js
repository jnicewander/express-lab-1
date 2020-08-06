'use strict';
const express = require('express');
const app = express();
const cartItems = require('./cart-items');
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/cart-items', cartItems);

app.get('*', (req, res) => {
    res.status(201);
    res.json({message: 'Well, it looks like you might have a typo!'})
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});