const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    contenu: {String,required: true}, 
    priorité: String,//élevée pour réclamation résolue , Normale en réponse en cours
    statut: String, //lue,nonlue

}, {
    timestamps: true
});

const notificationModel = mongoose.model('notification', notificationSchema);

module.exports = notificationModel;
