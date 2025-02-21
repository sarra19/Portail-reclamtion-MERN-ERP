const remboursementModel = require("../models/remboursementModel");

const { sql, connectDB } = require("../config/dbConfig")


async function add(req, res) {
    try {
        const userId = req.userId;
        console.log("userId :", req.userId)
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const { TargetType, Name, Subject, ComplaintType, AttachedFile, VoiceNote, Content, ServiceId, ProductId } = req.body;

console.log("Service id",ServiceId )

        if (!TargetType || !Name || !Subject) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
        }


        const pool = await connectDB();

        const query = `
            INSERT INTO [dbo].[CRONUS International Ltd_$Reclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            ([TargetType], [Name], [Subject], [ComplaintType], [AttachedFile], [Content], [VoiceNote], [UserId],[Status],[ServiceId],[ProductId])
            VALUES 
            (@TargetType, @Name, @Subject, @ComplaintType, @AttachedFile, @Content, @VoiceNote, @UserId,@Status,@ServiceId,@ProductId)
        `;
        const defaultVoiceNote = VoiceNote || "vide"
        const defaultServiceId = ServiceId || "vide"
        const defaultProductId = ProductId || "vide"

        await pool.request()
            .input('TargetType', sql.NVarChar, TargetType)
            .input('Name', sql.NVarChar, Name)
            .input('Subject', sql.NVarChar, Subject)
            .input('ComplaintType', sql.Int, ComplaintType)
            .input('AttachedFile', sql.NVarChar, AttachedFile)
            .input('Content', sql.NVarChar, Content)
            .input('VoiceNote', sql.NVarChar, defaultVoiceNote)
            .input('UserId', sql.NVarChar, userId)
            .input('ServiceId', sql.NVarChar, defaultServiceId)
            .input('ProductId', sql.NVarChar, defaultProductId)
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