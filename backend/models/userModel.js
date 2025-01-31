const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pseudo: String,
    prénom: {String,required: true},
    nom: {String,required: true},
    email: {
        type: String,
        unique: true,
        required: true
    },
    motdePasse: {String,required: true},
    imageprofile: String,
    adresse: String,
    pays: String,
    ville: String,
    codePostal: String,
    biographie: String,
    genre: String,
    téléphone:Number,
    role: {String,required: true},
    verified: { type: Boolean, default: false },


}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
