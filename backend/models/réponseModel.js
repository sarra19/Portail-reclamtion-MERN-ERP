const mongoose = require('mongoose');

const réponseSchema = new mongoose.Schema({
    réponseContenu: String, 
    serviceSupp: {type:String,required: true,enum: ['remboursement', 'intervention']},
    fichierJoint: {type:String,required: true},
   
        //    réclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'réclamation' } //pour sujet réclamation


}, {
    timestamps: true
});

const réponseModel = mongoose.model('réponse', réponseSchema);

module.exports = réponseModel;
