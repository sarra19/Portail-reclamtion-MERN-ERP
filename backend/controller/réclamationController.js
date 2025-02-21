const réclamationModel = require("../models/réclamationModel");
const { sql, connectDB } = require("../config/dbConfig")


async function add(req, res) {
    try {
        const userId = req.userId;
        console.log("userId :", req.userId)
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const { TargetType, Name, Subject, ComplaintType, AttachedFile, VoiceNote, Content, ServiceId, ProductId } = req.body;

        console.log("Service id", ServiceId)

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

async function detailsReclamation(req, res) {
    try {
        const pool = await connectDB();

        const reclamation = await pool.request()
            .input('No_', sql.NVarChar, req.params.id)
            .query(`
                SELECT 
                   *
                FROM [dbo].[CRONUS International Ltd_$Reclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [No_] = @No_
            `);

        res.status(200).json({ data: reclamation.recordset[0] });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

async function getall(req, res) {
    try {
        const pool = await connectDB();

        const result = await pool.request().query(`
                              SELECT * FROM [dbo].[CRONUS International Ltd_$Reclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                            `);
        const data = result.recordset
        console.log("data :", data)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la récupération des produits', details: err.message });
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
        console.log("userId", req.userId);

        const pool = await connectDB();

        const result = await pool.request()
            .input('userId', req.userId)
            .query(`
                SELECT * FROM [dbo].[CRONUS International Ltd_$Reclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [UserId] = @userId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Reclamation not found",
                error: true,
                success: false,
            });
        }
        res.status(200).json({
            success: true,
            data: result.recordset,
        });

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




module.exports = { add, getall, getbyid, mesReclamations, updateRéclamation, deleteRéclamation, detailsReclamation }