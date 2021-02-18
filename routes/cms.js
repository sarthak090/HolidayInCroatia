var express = require('express');
var router = express.Router();
const db = require("../models")


/* GET users listing. */
router.get('/', function(req, res, next) {
    db.Hotels.findById({})
});

module.exports = router;
