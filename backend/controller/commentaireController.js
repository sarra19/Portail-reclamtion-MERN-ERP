const commentaireModel = require("../models/commentaireModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const commentaire = new commentaireModel(req.body)
        await commentaire.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await commentaireModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateCommentaire(req, res) {
    try {
        await commentaireModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await commentaireModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteCommentaire(req, res) {
    try {
        await commentaireModel.findByIdAndDelete(req.params.id);
        res.status(200).send("commentaire deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateCommentaire, deleteCommentaire }