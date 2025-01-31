const mongoose = require('mongoose');

const réclamationSchema = new mongoose.Schema({
    typeCible: String, //(Service,produit)
    nomCible: {type:String,required: true},
    sujet: {type:String,required: true},
    typeRéclamation: {type:String,required: true,enum: ['textuelle', 'vocal']},
    fichierJoint:String,
    description:String,
    vocal:String,
    statut:{type:String,enum: ['en cours', 'résolu'],default: 'en cours'}, //ouverte,encours,résolue


}, {
    timestamps: true
});

const réclamationModel = mongoose.model('réclamation', réclamationSchema);

module.exports = réclamationModel;
