/**
 * Created by tomasnagy on 01/12/14.
 */
'use strict';
var mongoose = require('mongoose'),
    ItemSchema = require('../schemas/historyItem'),
    Item = mongoose.model('HistoryItem', ItemSchema, 'historyitems');

Item.getAllItems = function(next) {
    Item.find({}, next);
}

module.exports = Item;
