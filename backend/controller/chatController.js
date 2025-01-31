const chatModel = require("../models/chatModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const chat = new chatModel(req.body)
        await chat.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await chatModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateChat(req, res) {
    try {
        await chatModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await chatModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteChat(req, res) {
    try {
        await chatModel.findByIdAndDelete(req.params.id);
        res.status(200).send("chat deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateChat, deleteChat }