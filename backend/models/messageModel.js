const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   Contenu:String,
   durée:String,
   typeMessage:{type:String, required: true,enum: ['text', 'image', 'fichier','réaction'] },
   status:{type :String, required: true,enum: ['envoyé', 'lu','supprimé','modifié'], default: 'envoyé' }, //envoyé,réçu,lu,suprimé,modifié
}, {
    timestamps: true
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
