'use strict';
const express = require('express');
const pool = require("./pg-connection-pool");
const expressShopDB = express.Router();

function getTable(filters) {
    const defaults = {
        limit: 25,
        filterType: 'and'
    }
    let myFilters = {...defaults, ...filters}
    let query = 'select * from shopping_cart';
    let where = [];
    let params = [];

    if (myFilters.maxPrice) {
        params.push(myFilters.maxPrice);
        where.push(`price <= $${params.length}::int`);
    }
    if (myFilters.prefix) {
        params.push(myFilters.prefix);
        where.push(`product LIKE $${params.length}::text`);
    }
    if (myFilters.pageSize) {
        params.push(myFilters.prefix);
        where.push(`LIMIT $${params.length}::int`);
    }
    if (myFilters.id) {
        params.push(myFilters.id);
        where.push(`id = $${params.length}::int`);
    }
    if (params.length === 0) {
        params.push(myFilters.limit);
        query += ` LIMIT $${params.length}::int`;
    }
    if (where.length) {
        switch(myFilters.filterType.toUpperCase()) {
            case 'AND':
                query += ' WHERE ' + where.join(' AND ');
                break;
            case 'OR':
                query += ' WHERE ' + where.join(' OR ');
                break;
        }
    }

    console.log(query, params);
    return pool.query(query, params);
}

expressShopDB.get('/', (req, res) => {
    let filter = {};
    console.log(req.query);

    if (req.query.filterType) {
        filter.filterType = req.query.filterType;
    }
    if (req.query.limit) {
        filter.limit = req.query.limit;
    }
    if (req.query.maxPrice) {
        filter.maxPrice = req.query.maxPrice;
    }
    if (req.query.prefix) {
        filter.prefix = req.query.prefix + '%';
    }

    getTable(filter).then(result => {
        let data = result.rows;
        res.json(data);
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

expressShopDB.get('/:id', (req, res) => {
    getTable({ id: req.params.id }).then(result => {
        let data = result.rows;
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

expressShopDB.post('/', (req, res) => {
    const query = {
        name: 'add-product',
        text: 'INSERT INTO shopping_cart(product, price, quantity) VALUES($1, $2, $3) RETURNING *',
        values: [req.body.product, req.body.price, req.body.quantity]
    }
    pool.query(query).then(result => {
        let data = result.rows;
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
    console.log('New Product Added: ' + req.body.product + ' $' + req.body.price + ' Qty:' + req.body.quantity);
        
});

// expressShopDB.put('/:id', (req, res) => {
//     if (req.body) {
//         let product = cart.find((obj) => obj.id === parseInt(req.params.id));
//         if (req.body.product) {
//             product.product = req.body.product 
//         }
//         if (req.body.price) {
//             product.price = req.body.price
//         }
//         if (req.body.quantity) {
//             product.quantity = req.body.quantity
//         }
//         res.status(200);
//         res.json(product);
//     } else {
//         res.status(404);
//         res.json('There are no expressShopDB matching the submitted ID.')
//     }
// });

// expressShopDB.delete('/:id', (req, res) => {
//     let removeProduct = cart.map(product => { return product.id }).indexOf(parseInt(req.params.id));
//     cart.splice(removeProduct, 1);
//     res.status(200);
//     res.json('Product has been removed from cart.');
// });

module.exports = expressShopDB;