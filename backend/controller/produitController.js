const produitModel = require("../models/produitModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const produit = new produitModel(req.body)
        await produit.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await produitModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateProduit(req, res) {
    try {
        await produitModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await produitModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteProduit(req, res) {
    try {
        await produitModel.findByIdAndDelete(req.params.id);
        res.status(200).send("produit deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateProduit, deleteProduit }