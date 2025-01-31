const remboursementModel = require("../models/remboursementModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const remboursement = new remboursementModel(req.body)
        await remboursement.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await remboursementModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateRemboursement(req, res) {
    try {
        await remboursementModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await remboursementModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteRemboursement(req, res) {
    try {
        await remboursementModel.findByIdAndDelete(req.params.id);
        res.status(200).send("remboursement deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateRemboursement, deleteRemboursement }