const mongoose = require('mongoose');

const interventiontSchema = new mongoose.Schema({
   technicienResp: {type:String, required: true}, 
   dateIntervention: {type:Date,required: true}, 
   statut:{type:String,enum: ['en attente', 'terminé'],default:'en attente' },
   bénéficiaire:{type:String,required: true},
   sujetRéclamation:String, 
    //idRéclamation
    // réclamation:{ type: mongoose.Schema.Types.ObjectId, ref: 'Réclamation' }


}, {
    timestamps: true
});

const interventiontModel = mongoose.model('interventiont', interventiontSchema);

module.exports = interventiontModel;
