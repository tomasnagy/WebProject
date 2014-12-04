/**
 * Created by tomasnagy on 30/11/14.
 */
'use strict';
module.exports = (function() {
    var mongoose = require('mongoose'),
        mongodbURL = 'mongodb://localhost/guitarHistory',
        db = mongoose.connect(mongodbURL);
    mongoose.connection.on('open', function() {
        console.log('Connection with Mongo server at:', mongodbURL);
        mongoose.connection.db.collectionNames(function(err, names) {
            if(err) {
                console.log('Mongo collection error:', err);
            } else {
                console.log('Mongo collection list:');
                console.log(names);
            }
        });
    });
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose error:', err);
    });
    mongoose.connection.on('close', function() {
        console.log('Mongoose connection with ' + mongodbURL + ' closed.');
    });
})();