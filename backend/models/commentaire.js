const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
   contenu: {String, required: true}, 
   note:Number,
   auteur:{String, required: true}, //user fk
   statut:String ,//supprimé,publié,modifé
   fichier:String,


}, {
    timestamps: true
});

const commentaireModel = mongoose.model('commentaire', commentaireSchema);

module.exports = commentaireModel;
