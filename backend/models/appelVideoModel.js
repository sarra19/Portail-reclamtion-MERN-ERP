const mongoose = require('mongoose');

const appelVideoSchema = new mongoose.Schema({
   titre:String,
   durée:String,
   date:{type :Date, required: true},
   statut: {type:String, enum: ['planifié', 'en cours', 'terminé'],  default: 'planifié'}, 
   lien:{type: String, required: true},


}, {
    timestamps: true
});

const appelVideoModel = mongoose.model('appelVideo', appelVideoSchema);

module.exports = appelVideoModel;
