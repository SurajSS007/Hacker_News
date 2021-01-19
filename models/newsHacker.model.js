const mongoose = require('mongoose');

var newsHackerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    url: {
        type: String
    },
    text: {
        type: String
    }
});

mongoose.model('NewsHacker', newsHackerSchema);