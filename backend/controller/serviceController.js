const serviceModel = require("../models/serviceModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const service = new serviceModel(req.body)
        await service.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await serviceModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateService(req, res) {
    try {
        await serviceModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await serviceModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteService(req, res) {
    try {
        await serviceModel.findByIdAndDelete(req.params.id);
        res.status(200).send("service deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateService, deleteService }