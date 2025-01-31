const mongoose = require('mongoose');

const remboursementSchema = new mongoose.Schema({
    montant: {type: Number, required: true },
    dateRemboursement: { type:Date, required: true },
    statut: {type :String, required: true, enum: ['en attente', 'traité', 'non traité'] }, 
    bénéficiaire: { type : String, required: true },
    //idRéclamation
        //    réclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'réclamation' } // Référence à un modèle Réclamation

    //    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Référence à un modèle Réclamation



}, {
    timestamps: true
});

const remboursementModel = mongoose.model('remboursement', remboursementSchema);

module.exports = remboursementModel;
