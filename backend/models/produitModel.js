const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    image: String,
    nom: {type: String,required: true},
    description: String,
    fournisseur: {type :String,required: true},
    prix: {type :Number,required: true},
//likes
}, {
    timestamps: true
});

const produitModel = mongoose.model('produit', produitSchema);

module.exports = produitModel;
