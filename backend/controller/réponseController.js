const réponseModel = require("../models/réponseModel");
const { sql, connectDB } = require("../config/dbConfig")

async function add(req, res) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const {
            Subject,
            AttachedFile,
            Content,
            ReclamationId,
            ServiceSup,
            Montant,
            DatePrevu,
            TechnicienResponsable,
            DatePrevuInterv,
          } = req.body;
          
          console.log("Données reçues :", {
            Subject,
            AttachedFile,
            Content,
            ReclamationId,
            ServiceSup,
            Montant,
            DatePrevu,
            TechnicienResponsable,
            DatePrevuInterv,
          });
        // Validation des champs obligatoires
        if (!Subject || !Content || !ReclamationId) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
        }

        console.log("sevice sup :" , ServiceSup)
        console.log("Montant sup :" , Montant)
        console.log("date sup :" , DatePrevu)
        // Déterminer la valeur de ServiceSup

        
        
        console.log("DatePrevuInterv :", DatePrevuInterv);
        console.log("TechnicienResponsable:", TechnicienResponsable);

        const pool = await connectDB();

        // Vérifier si l'utilisateur a déjà répondu à cette réclamation
        const checkQuery = 
           ` SELECT COUNT(*) AS count 
            FROM [dbo].[CRONUS International Ltd_$ResponseReclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
            WHERE UserId = @UserId AND ReclamationId = @ReclamationId`
        ;

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
        const query = 
           ` INSERT INTO [dbo].[CRONUS International Ltd_$ResponseReclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            ([Subject], [AttachedFile], [Content], [UserId], [ServiceSup], [ReclamationId])
            OUTPUT INSERTED.No_
            VALUES 
            (@Subject, @AttachedFile, @Content, @UserId, @ServiceSup, @ReclamationId)`
        ;

        const defaultAttachedFile = AttachedFile || "vide";
        const result = await pool.request()
            .input('Subject', sql.NVarChar, Subject)
            .input('AttachedFile', sql.NVarChar, defaultAttachedFile)
            .input('Content', sql.NVarChar, Content)
            .input('UserId', sql.NVarChar, userId)
            .input('ServiceSup', sql.Int, ServiceSup)
            .input('ReclamationId', sql.NVarChar, ReclamationId)
            .query(query);

        const responseId = result.recordset[0].No_;

        // Gestion des services supplémentaires
        if (ServiceSup === 1 || ServiceSup===3) {
            // Validation des champs pour le remboursement
            if (!Montant || !DatePrevu) {
                return res.status(400).json({ message: "Les champs Montant et DatePrevu sont obligatoires pour un remboursement." });
            }

            const remboursementQuery = 
               ` INSERT INTO [dbo].[CRONUS International Ltd_$Payback$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                ([Montant], [DatePrevu], [ReponseId])
                VALUES 
                (@Montant, @DatePrevu, @ReponseId)`
            ;
            await pool.request()
                .input('Montant', sql.Decimal, Montant)
                .input('DatePrevu', sql.Date, DatePrevu)
                .input('ReponseId', sql.Int, responseId)
                .query(remboursementQuery);
        }

        if (ServiceSup === 2 || ServiceSup===3) {
            // Validation des champs pour l'intervention
            if (!DatePrevuInterv || !TechnicienResponsable) {
                return res.status(400).json({ message: "Les champs DatePrevuInterv et TechnicienResponsable sont obligatoires pour une intervention." });
            }
           

            
            const interventionQuery = 
                `INSERT INTO [dbo].[CRONUS International Ltd_$Intervention$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                ([DatePrevuInterv], [TechnicienResponsable], [ReponseId])
                VALUES 
                (@DatePrevuInterv, @TechnicienResponsable, @ReponseId)`
            ;
            await pool.request()
                .input('DatePrevuInterv', sql.Date, DatePrevuInterv)
                .input('TechnicienResponsable', sql.NVarChar, TechnicienResponsable)
                .input('ReponseId', sql.Int, responseId)
                .query(interventionQuery);
        }

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