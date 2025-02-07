const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    image: String,
    nom: { type: String, required: true },
    description: String,
    prix: {type: Number, required: true},

}, {
    timestamps: true
});

const serviceModel = mongoose.model('service', serviceSchema);

module.exports = serviceModel;
