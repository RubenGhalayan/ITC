var mongoose = require("mongoose");

var formSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    formID: { type: String },
    description: { type: Object },
    publishId: { type: String }
});

Form = mongoose.model('forms', formSchema);

module.exports = Form;

