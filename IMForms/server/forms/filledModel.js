var mongoose = require("mongoose");

var filledForms = new mongoose.Schema({
    formId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

filledForms = mongoose.model('filledForms', filledForms);
module.exports = filledForms;
