const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title : {
        type : String,
        required: false
    },
    author : {
        type: String,
        required: false,

    },
    contents : {
        type : String,
        required: false
    }
})

const Userdb = mongoose.model('Books', schema, 'Books');

module.exports = Userdb;
