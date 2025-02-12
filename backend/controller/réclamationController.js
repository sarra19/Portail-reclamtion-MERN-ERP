const réclamationModel = require("../models/réclamationModel");

async function add(req, res) {
    try {
        const userId = req.userId; 
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        console.log("ID utilisateur:", userId);
        console.log("Données reçues:", req.body);

       
        const reclamation = new réclamationModel({
            ...req.body,
            userId,
          
        });
        const saveReclamation = await reclamation.save();

        res.status(201).json({
            data: saveReclamation,
            success: true,
            error: false,
            message: "Réclamation créée avec succès!",
        });
    } catch (err) {
        console.error("Erreur lors de l'ajout de la réclamation:", err);
        res.status(400).send({ error: err.message });
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
async function mesReclamations(req, res) {
    try {// Récupération de l'ID utilisateur
        const data = await réclamationModel.find({ userId: req.userId });

        res.status(200).json(data);
    } catch (err) {
        console.error("Erreur lors de la récupération des réclamations:", err);
        res.status(500).json({ error: "Erreur serveur" });
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




module.exports = { add, getall, getbyid,mesReclamations, updateRéclamation, deleteRéclamation }