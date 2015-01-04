/**
 * Created by tomasnagy on 19/12/14.
 */
var express = require('express'),
    router = express.Router();

router.get('/inlay', function(req, res) {
    'use strict';
    res.render('directives/inlay');
});

module.exports = router;