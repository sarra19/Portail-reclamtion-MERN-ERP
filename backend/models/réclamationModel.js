const mongoose = require('mongoose');

const réclamationSchema = new mongoose.Schema({
    typeCible: String, //(Service,produit)
    nomCible: {String,required: true},
    sujet: {String,required: true},
    typeRéclamation: {String,required: true},//textuelle ou vocal
    fichierJoint:String,
    description:String,
    vocal:String,
    statut:string, //ouverte,encours,résolue


}, {
    timestamps: true
});

const réclamationModel = mongoose.model('réclamation', réclamationSchema);

module.exports = réclamationModel;
