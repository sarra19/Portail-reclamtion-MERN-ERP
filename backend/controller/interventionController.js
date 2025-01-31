const interventionModel = require("../models/interventionModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const intervention = new interventionModel(req.body)
        await intervention.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await interventionModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateIntervention(req, res) {
    try {
        await interventionModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await interventionModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteIntervention(req, res) {
    try {
        await interventionModel.findByIdAndDelete(req.params.id);
        res.status(200).send("intervention deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateIntervention, deleteIntervention }