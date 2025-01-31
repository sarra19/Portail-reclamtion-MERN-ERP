const historiqueModel = require("../models/historiqueModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const historique = new historiqueModel(req.body)
        await historique.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await historiqueModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateHistorique(req, res) {
    try {
        await historiqueModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await historiqueModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteHistorique(req, res) {
    try {
        await historiqueModel.findByIdAndDelete(req.params.id);
        res.status(200).send("historique deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateHistorique, deleteHistorique }