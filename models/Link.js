const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    link: {
         type: String,
         required: true
    },
    shorten: {
        type: String,
        required: true,
    }    
});


module.exports = mongoose.model('Link', linkSchema);