const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   nomChat:{type:String,required:true},
//    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Liste des utilisateurs
   photoChat:String,

   type: { type: String, enum: ['privé', 'groupe'], }, 
 //  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin du groupe
}, {
    timestamps: true
});

const chatModel = mongoose.model('chat', chatSchema);

module.exports = chatModel;
