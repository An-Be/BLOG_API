const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path');
const debug = require('debug')('app:sequelize');

//create an instance of the database call it db
const db = new Sequelize('Blog_API', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//export
module.exports = { db, Model, DataTypes };

