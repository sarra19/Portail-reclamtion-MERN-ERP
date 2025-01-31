const mongoose = require('mongoose');

const appelVideoSchema = new mongoose.Schema({
   titre:String,
   durée:String,
   date:{Date, required: true},
   status:{String, required: true}, //planifié,encours,terminé
   lien:{String, required: true},


}, {
    timestamps: true
});

const appelVideoModel = mongoose.model('appelVideo', appelVideoSchema);

module.exports = appelVideoModel;
