const express = require('express');
const brandRoute = require('../routes/brand.route');
const categRoute = require('../routes/category.route');
const productRoute = require('../routes/product.route');
const attrRoute = require('../routes/attribute.route');
const attrValRoute = require('../routes/attributevalue.route');
const supplierRoute = require('../routes/supplier.route');
const inventoryRoute = require('../routes/inventory.route');
const generateOrderRoute = require('../routes/generateOrder.route');
const lgnrolesRoute = require('../routes/loginroles.route');
const ordersRoute = require('../routes/order.route');
const importfromExlRoute = require('../routes/importfromExl.route');

const mainRoute = express.Router();

mainRoute.use(brandRoute);
mainRoute.use(categRoute);
mainRoute.use(productRoute);
mainRoute.use(attrRoute);
mainRoute.use(attrValRoute);
mainRoute.use(supplierRoute);
mainRoute.use(ordersRoute);
mainRoute.use(inventoryRoute);
mainRoute.use(generateOrderRoute);
mainRoute.use(lgnrolesRoute);
mainRoute.use(importfromExlRoute )


module.exports = mainRoute;

