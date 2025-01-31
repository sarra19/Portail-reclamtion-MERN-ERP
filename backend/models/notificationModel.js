const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    contenu: {type:String,required: true}, 
    priorité:{type:String,required: true,enum: ['élevée', 'normal']},//élevée pour réclamation résolue , Normale en réponse en cours
    statut: {type:String,required: true,enum: ['lue', 'non lue']}, //lue,nonlue
    // utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, {
    timestamps: true
});

const notificationModel = mongoose.model('notification', notificationSchema);

module.exports = notificationModel;
