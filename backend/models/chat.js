const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   nomChat:String,
   participants:{String, required: true},//user fk
   photoChat:String,


}, {
    timestamps: true
});

const chatModel = mongoose.model('chat', chatSchema);

module.exports = chatModel;
