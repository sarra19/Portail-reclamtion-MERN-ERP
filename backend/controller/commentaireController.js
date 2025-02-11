const commentaireModel = require("../models/commentaireModel");

async function add(req, res) {
    try {

        const userId = req.userId;

        const commentaire = new commentaireModel({
            ...req.body,
            userId,
        });
        await commentaire.save();
       
        res.status(201).json({
            data: commentaire,
            success: true,
            error: false,
            message: "commentaire créée avec succès!",
        });
    } catch (err) {
        console.error("Erreur lors de l'ajout de commentaire:", err);
        res.status(400).send({ error: err.message });
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
async function getCommentsByService(req, res) {
    try {
        const comments = await commentaireModel.find({ serviceId: req.params.id })
            .populate("userId", "nom prenom imageprofile"); // Récupérer le nom et prénom de l'utilisateur

        res.status(200).json({ success: true, data: comments });
    } catch (err) {
        console.error("Erreur lors de la récupération des commentaires :", err);
        res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
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




module.exports = { add, getall, getbyid,getCommentsByService, updateCommentaire, deleteCommentaire }