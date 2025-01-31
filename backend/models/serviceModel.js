const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    image: String,
    nomService: { type: String, required: true },
    description: String,
    prix: {type: Number, required: true},

}, {
    timestamps: true
});

const serviceModel = mongoose.model('service', serviceSchema);

module.exports = serviceModel;
