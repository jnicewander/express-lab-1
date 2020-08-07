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
    },
    {
        id: 6,
        product: 'Ugly Lamp Shade',
        price: 2.99,
        quantity: 2
    },
    {
        id: 7,
        product: 'Decorative Shower Head',
        price: 329.99,
        quantity: 2
    },
    {
        id: 8,
        product: 'Fancy Chair',
        price: 89.99,
        quantity: 4
    },
    {
        id: 9,
        product: 'Fancy Curtain',
        price: 39.99,
        quantity: 8
    }
];

products.get('/', (req, res) => {
    // maxPrice - if specified, only include products that are at or below this price.
    let cartWithParams = [...cart];
    if (req.query.maxPrice) {
        cartWithParams = cartWithParams.filter(obj => obj.price <= req.query.maxPrice);
    }
    if (req.query.prefix) {
        cartWithParams = cartWithParams.filter(obj => obj.product.toLowerCase().startsWith(req.query.prefix.toLowerCase()));
    }
    if (req.query.pageSize) {
        cartWithParams = cartWithParams.slice(0, req.query.pageSize);
    }
    res.status(200);
    res.json(cartWithParams);
});






module.exports = products;