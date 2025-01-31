const messageModel = require("../models/messageModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const message = new messageModel(req.body)
        await message.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await messageModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateMessage(req, res) {
    try {
        await messageModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await messageModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteMessage(req, res) {
    try {
        await messageModel.findByIdAndDelete(req.params.id);
        res.status(200).send("message deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateMessage, deleteMessage }