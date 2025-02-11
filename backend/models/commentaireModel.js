const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
   contenu: { type: String, required: true },
   statut: { type: String, required: true, enum: ['supprimé', 'publié', 'modifié'], default: 'publié' },
   fichierJoint: [],
   serviceId: String,
   produitId: String,
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true } 




}, {
   timestamps: true
});

const commentaireModel = mongoose.model('commentaire', commentaireSchema);

module.exports = commentaireModel;
