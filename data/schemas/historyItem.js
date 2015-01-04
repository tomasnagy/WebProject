/**
 * Created by tomasnagy on 01/12/14.
 */
var mongoose = require('mongoose'),
    ItemScheme = new mongoose.Schema({
        title:{type: String},
        date: {type: String},
        description: {type: String},
        image: {type: String},
        interactiveGuitarName: {type: String}
    });

module.exports = ItemScheme;