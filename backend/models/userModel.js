const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    No_: String,
    prénom: {type:String,required: true},
    nom: {type:String,required: true},
    email: {
        type: String,
        unique: true,
        required: true
    },
    motdePasse: {type:String,required: true},
    imageprofile: String,
    adresse: String,
    pays: String,
    ville: String,
    codePostal: String,
    biographie: String,
    genre: String,
    téléphone:Number,
    role: {type:String,enum: ['admin', 'client', 'fournisseur'],default:'client'},
    verified: { type: Boolean, default: false },


}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
