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

    console.log('Query from getTable: ' + query + ' Params from getTable: '+ params);
    return pool.query(query, params);
}

expressShopDB.get('/', (req, res) => {
    let filter = {};

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
        res.status(200).json(data);
    }).catch(err => {
        res.sendStatus(500);
        console.log('ERROR: ' + err);
    });
});

expressShopDB.get('/:id', (req, res) => {
    getTable({ id: req.params.id }).then(result => {
        let data = result.rows;
        res.status(200).json(data);
    }).catch(err => {
        console.log('ERROR: ' + err);
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
    console.log(query)
    console.log('New Product Added: ' + req.body.product + ' $' + req.body.price + ' Qty:' + req.body.quantity);
        
});

expressShopDB.put('/:id', (req, res) => {
    let query = ['UPDATE shopping_cart SET'];
    let params = [];
    let set = [];
    
    if (req.body) {
        if (req.body.product) {
            params.push(req.body.product);
            set.push(`product = $${params.length}::text`)
        }
        if (req.body.price) {
            params.push(req.body.price);
            set.push(`price = $${params.length}::int`)
        }
        if (req.body.quantity) {
            params.push(req.body.quantity);
            set.push(`quantity = $${params.length}::int`)
        }
    }
    query.push(set.join(', '));
    query.push(`WHERE id = ${parseInt(req.params.id)} RETURNING *`);
    query = query.join(' ');
    console.log(query, params);

    pool.query(query, params).then(result => {
        let data = result.rows;
        res.json(data);
        console.log(data + 'has been updated');
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });




   
});

// expressShopDB.delete('/:id', (req, res) => {
//     let removeProduct = cart.map(product => { return product.id }).indexOf(parseInt(req.params.id));
//     cart.splice(removeProduct, 1);
//     res.status(200);
//     res.json('Product has been removed from cart.');
// });

module.exports = expressShopDB;