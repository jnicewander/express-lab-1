'use strict';
const express = require('express');
const products = express.Router();
const myProducts = [
    {
        id: 001,
        product: 'Fancy Lamp',
        price: 29.99,
        quantity: 2
    },
    {
        id: 002,
        product: 'Decorative Rug',
        price: 25.99,
        quantity: 3
    },
    {
        id: 003,
        product: 'Fancy Bed Sheets',
        price: 99.99,
        quantity: 1
    },
    {
        id: 004,
        product: 'Decorative Spoon',
        price: 9.99,
        quantity: 10
    },
    {
        id: 005,
        product: 'Fancy Desk',
        price: 329.99,
        quantity: 1
    }
];

products.get('/', (req, res) => {
    res.status(200);
})






module.exports = routes;