'use strict';
const express = require('express');
const products = express.Router();
const myProducts = [
    {
        id: 1,
        product: 'Fancy Lamp',
        price: 29.99,
        quantity: 2
    },
    {
        id: 2,
        product: 'Decorative Rug',
        price: 25.99,
        quantity: 3
    },
    {
        id: 3,
        product: 'Fancy Bed Sheets',
        price: 99.99,
        quantity: 1
    },
    {
        id: 4,
        product: 'Decorative Spoon',
        price: 9.99,
        quantity: 10
    },
    {
        id: 5,
        product: 'Fancy Desk',
        price: 329.99,
        quantity: 1
    }
];

products.get('/', (req, res) => {
    res.status(200);
})






module.exports = products;