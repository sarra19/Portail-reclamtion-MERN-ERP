const mongoose = require('mongoose');

const réclamationSchema = new mongoose.Schema({
    typeCible:{type:String,required: true}, //(Service,produit)
    nom: {type:String,required: true},
    sujet: {type:String,required: true},
    typeReclamation: {type:String,required: true,enum: ['textuelle', 'vocal']},//
    fichierJoint:[],//
    contenu:String,//
    vocal:String, //
    statut:{type:String,enum: ['en cours', 'résolu'],default: 'en cours'}, //ouverte,encours,résolue
    userId : String,

}, {
    timestamps: true
});

const réclamationModel = mongoose.model('réclamation', réclamationSchema);

module.exports = réclamationModel;
