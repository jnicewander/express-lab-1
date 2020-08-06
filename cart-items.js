'use strict';
const express = require('express');
const products = express.Router();
const cart = [
    {
        id: 1,
        product: 'Decorative Lamp',
        price: 59.99,
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
        product: 'Ugly Bed Sheets',
        price: 19.99,
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
    // maxPrice - if specified, only include products that are at or below this price.
    let cartWithParams = [];
    if (req.query.maxPrice) {
        cartWithParams.push(cart.filter(obj => obj.price <= req.query.maxPrice));
    }
    if (req.query.prefix) {
        for (let obj of cart) {
            if (obj.product.toLowerCase().includes(req.query.prefix.toLowerCase())) {
                cartWithParams.push(obj);
            }
        }
    }
    res.status(200);
    res.json(cartWithParams);
});






module.exports = products;