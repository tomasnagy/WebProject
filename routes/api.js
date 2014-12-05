/**
 * Created by tomasnagy on 01/12/14.
 */
var express = require('express'),
    router = express.Router()
    HistoryItem = require('../data/models/historyItem');

router.get('/allData', function(req, res) {
    HistoryItem.getAllItems(function(err, data) {
        console.log(err);
        if(!err)
            res.json(data);
    });
});

module.exports = router;