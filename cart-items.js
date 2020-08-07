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
    let cartCopy = [...cart];
    if (req.query.maxPrice) {
        cartCopy = cartCopy.filter(obj => obj.price <= req.query.maxPrice);
    }
    if (req.query.prefix) {
        cartCopy = cartCopy.filter(obj => obj.product.toLowerCase().startsWith(req.query.prefix.toLowerCase()));
    }
    if (req.query.pageSize) {
        cartCopy = cartCopy.slice(0, req.query.pageSize);
    }
    res.status(200);
    res.json(cartCopy);
});

products.get('/:id', (req, res) => {
    const product = cart.find((obj) => obj.id === parseInt(req.params.id));
    if(product) {
        res.status(200);
        res.json(product);
    } else {
        res.status(404);
        res.json('ID Not Found');
    }    
});

products.post('/', (req, res) => {
    if (req.body && req.body.product && req.body.price && req.body.quantity) {
        cart.push({
            id: cart.length + 1,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.status(201);
        res.json(cart[cart.length - 1]);
    } else {
        res.json('Incorrect format.')
    }
});

products.put('/:id', (req, res) => {
    
});


module.exports = products;