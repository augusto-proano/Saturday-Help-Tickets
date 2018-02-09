'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./students');

const Test = db.define();

module.exports = Test;
