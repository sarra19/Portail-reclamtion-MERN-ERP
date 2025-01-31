const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
   contenu: {type:String, required: true}, 
   note:{type:Number, min: 1, max: 5 } ,
//    auteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //user fk
   statut: {type:String, required: true, enum: ['supprimé', 'publié', 'modifié'],  default: 'publié'   }, 
   fichier:String,

}, {
    timestamps: true
});

const commentaireModel = mongoose.model('commentaire', commentaireSchema);

module.exports = commentaireModel;
