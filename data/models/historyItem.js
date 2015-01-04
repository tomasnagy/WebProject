/**
 * Created by tomasnagy on 01/12/14.
 */
var mongoose = require('mongoose'),
    ItemSchema = require('../schemas/historyItem'),
    Item = mongoose.model('HistoryItem', ItemSchema, 'historyitems');

Item.getAllItems = function(next) {
    'use strict';
    Item.find({}, next);
};

module.exports = Item;
