/**
 * Created by tomasnagy on 28/12/14.
 */
var test = require('tape');
var randomgenerator = require('../util/randomgenerator');

test('10000 random ID\'s', function (t) {
    'use strict';
    var i = 9999,
        allIDs = [],
        handler = function(random) {
            t.equal(allIDs.indexOf(random), -1, 'should be unique');
            allIDs.push(random);
        };

    t.plan(10000);

    for(i; i >= 0; i--) {
        randomgenerator.getRandomID(10, handler);
    }
});

test('a random contains only valid chars', function(t) {
    'use strict';
    randomgenerator.getRandomID(200, function(random) {
        var validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            i = random.length - 1;
        t.plan(200);
        for(i; i >= 0; i--) {
            t.ok(validChars.indexOf(random[i], 1), 'valid character');
        }
    });
});