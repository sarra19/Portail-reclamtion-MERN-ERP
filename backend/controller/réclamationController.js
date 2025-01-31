const réclamationModel = require("../models/réclamationModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const réclamation = new réclamationModel(req.body)
        await réclamation.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await réclamationModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateRéclamation(req, res) {
    try {
        await réclamationModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await réclamationModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteRéclamation(req, res) {
    try {
        await réclamationModel.findByIdAndDelete(req.params.id);
        res.status(200).send("réclamation deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateRéclamation, deleteRéclamation }