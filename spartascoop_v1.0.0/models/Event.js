var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    title : String,
    description : String,
    location : String,
    website : String,
    free_stuffs : [],
    entryfees : 0,
    postedby : String,
    postedbydetails : {}
});

module.exports = eventSchema;
