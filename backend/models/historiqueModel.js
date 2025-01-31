const mongoose = require('mongoose');

const historiqueSchema = new mongoose.Schema({
   description:{type:String, required: true},
//    utilisateur:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },//user fk
   activité:{type:String, required: true},


}, {
    timestamps: true
});

const historiqueModel = mongoose.model('historique', historiqueSchema);

module.exports = historiqueModel;
