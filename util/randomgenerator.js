/**
 * Created by tomasnagy on 11/12/14.
 */

module.exports = (function() {
    'use strict';
    var getRandomID = function(length, callback) {
        var result = '',
            pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            l = pool.length;

        length--;

        for(length; length >= 0; length--) {
            result += pool.substr(Math.floor(Math.random() * l), 1);
        }

        callback(result);
    };
    return {
        getRandomID: getRandomID
    };
})();