const mongoose = require('mongoose');

const interventiontSchema = new mongoose.Schema({
   technicienResp: {String, required: true}, 
   dateIntervention: {Date,required: true}, 
   statut:{String,required: true},// En attente , terminé 
   bénéficiaire:{String,required: true},
   sujetRéclamation:string, //fk
    //idRéclamation


}, {
    timestamps: true
});

const interventiontModel = mongoose.model('interventiont', interventiontSchema);

module.exports = interventiontModel;
