'use strict';
const express = require('express');
const pool = require("./pg-connection-pool");
const expressShopDB = express.Router();

function getTable() {
    let query = 'select * from shopping_cart'
    console.log(query);
    return pool.query(query);
};

expressShopDB.get('/', (req, res) => {
    
    console.log(req.query)
    getTable().then(result => {
        let data = result.rows;
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
    
    // if (req.query.maxPrice) {
    //     cartCopy = cartCopy.filter(obj => obj.price <= req.query.maxPrice);
    // }
    // if (req.query.prefix) {
    //     cartCopy = cartCopy.filter(obj => obj.product.toLowerCase().startsWith(req.query.prefix.toLowerCase()));
    // }
    // if (req.query.pageSize) {
    //     cartCopy = cartCopy.slice(0, req.query.pageSize);
    // }
    // res.status(200);
    // res.json(cartCopy);
});

expressShopDB.get('/:id', (req, res) => {
    const product = cart.find((obj) => obj.id === parseInt(req.params.id));
    if(product) {
        res.status(200);
        res.json(product);
    } else {
        res.status(404);
        res.json('ID Not Found');
    }    
});

expressShopDB.post('/', (req, res) => {
    let autoID = cart.length + 1;
    if (req.body && req.body.product && req.body.price && req.body.quantity) {
        cart.push({
            id: autoID,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.status(201);
        res.json(cart[cart.length - 1]);
    } else {
        res.json('Incorrect format. Make sure to include "product, price, and quantity" fields.')
    }
});

expressShopDB.put('/:id', (req, res) => {
    if (req.body) {
        let product = cart.find((obj) => obj.id === parseInt(req.params.id));
        if (req.body.product) {
            product.product = req.body.product 
        }
        if (req.body.price) {
            product.price = req.body.price
        }
        if (req.body.quantity) {
            product.quantity = req.body.quantity
        }
        res.status(200);
        res.json(product);
    } else {
        res.status(404);
        res.json('There are no expressShopDB matching the submitted ID.')
    }
});

expressShopDB.delete('/:id', (req, res) => {
    let removeProduct = cart.map(product => { return product.id }).indexOf(parseInt(req.params.id));
    cart.splice(removeProduct, 1);
    res.status(200);
    res.json('Product has been removed from cart.');
});

module.exports = expressShopDB;