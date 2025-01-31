const mongoose = require('mongoose');

const réponseSchema = new mongoose.Schema({
    réponseContenu: String, 
    serviceSupp: {String,required: true},
    fichierJoint: {String,required: true},
   
    sujetRéclamation:string, //fk


}, {
    timestamps: true
});

const réponseModel = mongoose.model('réponse', réponseSchema);

module.exports = réponseModel;
