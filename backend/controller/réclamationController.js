const réclamationModel = require("../models/réclamationModel");
const { sql, connectDB } = require("../config/dbConfig")


async function add(req, res) {
    try {
        const userId = req.userId;
        console.log("userId :",  req.userId)
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const { TargetType, Name, Subject, ComplaintType ,AttachedFile,VoiceNote,Content} = req.body;
      


        if (!TargetType || !Name || !Subject) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
        }


        const pool = await connectDB();

        const query = `
            INSERT INTO [dbo].[CRONUS International Ltd_$Reclamations$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            ([TargetType], [Name], [Subject], [ComplaintType], [AttachedFile], [Content], [VoiceNote], [UserId],[Status])
            VALUES 
            (@TargetType, @Name, @Subject, @ComplaintType, @AttachedFile, @Content, @VoiceNote, @UserId,@Status)
        `;

        await pool.request()
            .input('TargetType', sql.NVarChar, TargetType)
            .input('Name', sql.NVarChar, Name)
            .input('Subject', sql.NVarChar, Subject)
            .input('ComplaintType', sql.Int, ComplaintType)
            .input('AttachedFile', sql.NVarChar, AttachedFile)
            .input('Content', sql.NVarChar, Content)
            .input('VoiceNote', sql.NVarChar, VoiceNote)
            .input('UserId', sql.NVarChar, userId)
            .input('Status', sql.Int, 0)
            .query(query);

        // Success response
        res.status(201).json({
            success: true,
            error: false,
            message: "Réclamation créée avec succès!",
        });

    } catch (err) {
        console.error("Erreur lors de l'ajout de la réclamation:", err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Erreur lors de l'ajout de la réclamation.",
            details: err.message,
        });
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




module.exports = { add, getall, getbyid, mesReclamations, updateRéclamation, deleteRéclamation }