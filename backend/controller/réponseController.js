const réponseModel = require("../models/réponseModel");
const { sql, connectDB } = require("../config/dbConfig")


async function add(req, res) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const { Subject, AttachedFile, Content, ReclamationId, ServiceSup } = req.body;

        if (!Subject || !Content || !ReclamationId) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
        }

        const pool = await connectDB();

        // Vérifier si l'utilisateur a déjà répondu à cette réclamation
        const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM [dbo].[CRONUS International Ltd_$ReponseReclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
            WHERE UserId = @UserId AND ReclamationId = @ReclamationId
        `;

        const checkResult = await pool.request()
            .input('UserId', sql.NVarChar, userId)
            .input('ReclamationId', sql.NVarChar, ReclamationId)
            .query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Vous avez déjà répondu à cette réclamation."
            });
        }

        // Insérer la réponse
        const query = `
            INSERT INTO [dbo].[CRONUS International Ltd_$ReponseReclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            ([Subject], [AttachedFile], [Content], [UserId], [ServiceSup], [ReclamationId])
            VALUES 
            (@Subject, @AttachedFile, @Content, @UserId, @ServiceSup, @ReclamationId)
        `;
        const defaultAttachedFile= AttachedFile || "vide"

        await pool.request()
            .input('Subject', sql.NVarChar, Subject)
            .input('AttachedFile', sql.NVarChar, defaultAttachedFile)
            .input('Content', sql.NVarChar, Content)
            .input('UserId', sql.NVarChar, userId)
            .input('ServiceSup', sql.Int, ServiceSup || 0)
            .input('ReclamationId', sql.NVarChar, ReclamationId)
            .query(query);

        res.status(201).json({
            success: true,
            error: false,
            message: "Réponse créée avec succès!",
        });

    } catch (err) {
        console.error("Erreur lors de l'ajout de réponse:", err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Erreur lors de l'ajout de réponse.",
            details: err.message,
        });
    }
}



async function getall(req, res) {
    try {
        const data = await réponseModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateRéponse(req, res) {
    try {
        await réponseModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await réponseModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteRéponse(req, res) {
    try {
        await réponseModel.findByIdAndDelete(req.params.id);
        res.status(200).send("réponse deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateRéponse, deleteRéponse }