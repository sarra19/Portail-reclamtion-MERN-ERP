const { sql, connectDB } = require("../config/dbConfig")

async function add(req, res) {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const { Content, AttachedFile, ServiceId, ProductId } = req.body;

        if (!Content) {
            return res.status(400).json({ message: "Saisir votre Commentaire." });
        }

        console.log("🔹 ServiceId reçu:", ServiceId); // ➜ Affiche la valeur dans la console
        console.log("🔹 ProductId reçu:", ProductId); // ➜ Vérification du ProductId aussi

        const pool = await connectDB();

        const query = `
            INSERT INTO [dbo].[CRONUS International Ltd_$Comment$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            ([Content], [Status], [ServiceId], [ProductId], [AttachedFile], [UserId],[CreatedAt])
            VALUES 
            (@Content, @Status, @ServiceId, @ProductId, @AttachedFile, @UserId,@CreatedAt)
        `;

        const defaultProductId = ProductId || "vide";
        const defaultServiceId = ServiceId || "vide";

        const createdAt = new Date();
        await pool.request()
            .input('Content', sql.NVarChar, Content)
            .input('ServiceId', sql.NVarChar, defaultServiceId)
            .input('ProductId', sql.NVarChar, defaultProductId)
            .input('AttachedFile', sql.NVarChar, AttachedFile)
            .input('UserId', sql.NVarChar, userId)
            .input('Status', sql.Int, 0)
            .input('CreatedAt', sql.DateTime, createdAt)
            .query(query);

        res.status(201).json({
            success: true,
            error: false,
            message: "Commentaire envoyé avec succès!",
            data: {
                Content,
                Status: 0,
                ServiceId: defaultServiceId,
                ProductId: defaultProductId,
                AttachedFile,
                UserId: userId,
                CreatedAt: createdAt
            }
        });
    } catch (err) {
        console.error("❌ Erreur lors de l'ajout de commentaire:", err);
        res.status(400).send({ error: err.message });
    }
}

async function getall(req, res) {

    try {
        const pool = await connectDB();

        const result = await pool.request().query(`
                   SELECT 
                   c.[No_]
                c.[Content], 
                c.[Status], 
                c.[ServiceId], 
                c.[ProductId], 
                c.[AttachedFile], 
                c.[UserId], 
                c.[timestamp]
              
            FROM 
                [dbo].[CRONUS International Ltd_$Comment$deddd337-e674-44a0-998f-8ddd7c79c8b2] c
                `);
        const data = result.recordset
        console.log("data :", data)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateCommentaire(req, res) {
    // try {
    //     await commentaireModel.findByIdAndUpdate(
    //         req.params.id,
    //         req.body);
    //     res.status(200).send("data updated")

    // } catch (err) {
    //     res.status(400).json(err);
    // }
}
async function getbyid(req, res) {
    try {
        const pool = await connectDB();

        const comment = await pool.request()
            .input('No_', sql.NVarChar, req.params.id)
            .query(`
                 SELECT 
                 c.[No_]
                c.[Content], 
                c.[Status], 
                c.[ServiceId], 
                c.[ProductId], 
                c.[AttachedFile], 
                c.[UserId], 
                c.[timestamp]
              
            FROM 
                [dbo].[CRONUS International Ltd_$Comment$deddd337-e674-44a0-998f-8ddd7c79c8b2] c
                WHERE [No_] = @No_
            `);

        res.status(200).json({ data: comment.recordset[0] });
    } catch (err) {
        res.status(400).send(err);
    }
}

async function deleteComment(req, res) {
    try {
        const pool = await connectDB();
        const userId = req.userId;

        const comment = await pool.request()
            .input('No_', sql.NVarChar, req.params.id)
            .input('UserId', sql.NVarChar, userId)
            .query(`
              Delete FROM 
                [dbo].[CRONUS International Ltd_$Comment$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
                WHERE [No_] = @No_ AND [UserId] = @UserId
            `);

        res.status(200).json({ data: comment.recordset[0] });
    } catch (err) {
        res.status(400).send(err);
    }
}

async function getCommentsByService(req, res) {
    try {
        const serviceId = req.params.id;
        console.log("service :", serviceId)
        console.log("service :", req.params.id)
        if (!serviceId) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }

        const pool = await connectDB();

        const query = `
            SELECT 
             c.[No_],
             c.[Content], 
             c.[Status], 
             c.[ServiceId], 
             c.[ProductId], 
             c.[AttachedFile], 
             c.[UserId], 
             c.[CreatedAt],
             u.[FirstName], 
             u.[LastName], 
             u.[ProfileImage]
            FROM 
                [dbo].[CRONUS International Ltd_$Comment$deddd337-e674-44a0-998f-8ddd7c79c8b2] c
            INNER JOIN 
                [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2] u 
            ON 
                c.[UserId] = u.[No_]
            WHERE 
                c.[ServiceId] = @ServiceId
        `;

        const result = await pool.request()
            .input('ServiceId', sql.NVarChar, serviceId)
            .query(query);
        const comments = result.recordset.map(comment => ({
            Content: comment.Content,
            Status: comment.Status,

            AttachedFile: comment.AttachedFile,
            UserId: comment.UserId,
            CreatedAt: comment.CreatedAt,
            user: {
                FirstName: comment.FirstName,
                LastName: comment.LastName,
                ProfileImage: comment.ProfileImage
            }
        }));
        res.status(200).json({ success: true, data: comments });
    } catch (err) {
        console.error("Erreur lors de la récupération des commentaires :", err);
        res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
    }
}

async function getCommentsByProduct(req, res) {
    try {
        const ProductId = req.params.id;
        console.log("produit :", req.params.id)
        if (!ProductId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const pool = await connectDB();

        const query = `
            SELECT 
             c.[No_],
                c.[Content], 
                c.[Status], 
                c.[ServiceId], 
                c.[ProductId], 
                c.[AttachedFile], 
                c.[UserId], 
                c.[CreatedAt],
                u.[FirstName], 
                u.[LastName], 
                u.[ProfileImage]
            FROM 
                [dbo].[CRONUS International Ltd_$Comment$deddd337-e674-44a0-998f-8ddd7c79c8b2] c
            INNER JOIN 
                [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2] u 
            ON 
                c.[UserId] = u.[No_]
            WHERE 
                c.[ProductId] = @ProductId
        `;

        const result = await pool.request()
            .input('ProductId', sql.NVarChar, ProductId)
            .query(query);
        const comments = result.recordset.map(comment => ({
            Content: comment.Content,
            Status: comment.Status,

            AttachedFile: comment.AttachedFile,
            UserId: comment.UserId,
            CreatedAt: comment.CreatedAt,
            user: {
                FirstName: comment.FirstName,
                LastName: comment.LastName,
                ProfileImage: comment.ProfileImage
            }
        }));

        res.status(200).json({ success: true, data: comments });
    } catch (err) {
        console.error("Erreur lors de la récupération des commentaires :", err);
        res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
    }
}





module.exports = { add, getall, getbyid, getCommentsByService, getCommentsByProduct, updateCommentaire, deleteComment }