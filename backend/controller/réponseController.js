const réponseModel = require("../models/réponseModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const réponse = new réponseModel(req.body)
        await réponse.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await réponseModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateRéponse(req, res) {
    try {
        await réponseModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await réponseModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteRéponse(req, res) {
    try {
        await réponseModel.findByIdAndDelete(req.params.id);
        res.status(200).send("réponse deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateRéponse, deleteRéponse }