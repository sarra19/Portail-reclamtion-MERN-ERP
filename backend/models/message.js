const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   Contenu:String,
   durée:String,
   typeMessage:{String, required: true},//text,image,fichier,réaction
   status:{String, required: true}, //envoyé,réçu,lu,suprimé,modifié


}, {
    timestamps: true
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
