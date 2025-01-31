const mongoose = require('mongoose');

const remboursementSchema = new mongoose.Schema({
    montant: { Number, required: true },
    dateRemboursement: { Date, required: true },
    statut: {String, required: true, enum: ['en attente', 'traité', 'non traité'] }, 
    bénéficiaire: { String, required: true },
    //idRéclamation
    //    réclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'Réclamation', required: true } // Référence à un modèle Réclamation



}, {
    timestamps: true
});

const remboursementModel = mongoose.model('remboursement', remboursementSchema);

module.exports = remboursementModel;
