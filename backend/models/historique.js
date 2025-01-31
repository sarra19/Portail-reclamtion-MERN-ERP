const mongoose = require('mongoose');

const historiqueSchema = new mongoose.Schema({
   description:{String, required: true},
   utilisateur:{String, required: true},//user fk
   activité:{String, required: true},


}, {
    timestamps: true
});

const historiqueModel = mongoose.model('historique', historiqueSchema);

module.exports = historiqueModel;
