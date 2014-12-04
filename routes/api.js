/**
 * Created by tomasnagy on 01/12/14.
 */
var express = require('express'),
    router = express.Router()
    HistoryItem = require('../data/models/historyItem');

router.get('/allData', function(req, res) {
    HistoryItem.find({}).exec(function(err, docs) {
        console.log(err);
        if(!err)
            res.json(docs);
    });
});

module.exports = router;