const { sql, connectDB } = require("../config/dbConfig")

async function add(req, res) {
    try {
        console.log('data', req.body.name);
        const pool = await connectDB();

        const checkQuery = `
    SELECT COUNT(*) AS count
    FROM [dbo].[CRONUS International Ltd_$Produit$deddd337-e674-44a0-998f-8ddd7c79c8b2]
    WHERE [No_] = @No_
  `;

        const result = await pool.request()
            .input('No_', sql.NVarChar, req.body.No_)
            .query(checkQuery);

        if (result.recordset[0].count > 0) {
            return res.status(400).send({ error: 'Product No_ must be unique.' });
        }

        const query = `
      INSERT INTO [dbo].[CRONUS International Ltd_$Produit$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
      ([No_],[Name], [Description], [Price], [Vendor],[Image])
      VALUES
      (@No_,@Name, @Description, @Price, @Vendor,@Image)
    `;

        await pool.request()
            .input('No_', sql.NVarChar, req.body.No_)
            .input('Name', sql.NVarChar, req.body.Name)
            .input('Description', sql.NVarChar, req.body.description)
            .input('Price', sql.Decimal, req.body.Price)
            .input('Vendor', sql.NVarChar, req.body.Vendor)
            .input('Image', sql.NVarChar, req.body.Image)

            .query(query);

        res.status(200).send("Product added successfully");

    } catch (err) {
        console.error("Error adding product:", err);
        res.status(400).send({ error: err.message });
    }
}

async function getall(req, res) {

    try {
        const pool = await connectDB();

        const result = await pool.request().query(`
              SELECT 
               [timestamp],[No_],[Name], [Description],[Price],[Image],[Vendor]
              FROM [dbo].[CRONUS International Ltd_$Produit$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            `);
        const data = result.recordset
        console.log("data :", data)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la récupération des produits', details: err.message });
    }
}

async function getProductDetails(req, res) {
    try {
        const pool = await connectDB();

        const produit = await pool.request()
            .input('No_', sql.NVarChar, req.params.id)
            .query(`
                SELECT 
                    [timestamp],
                    [No_] AS id,
                    [Name], 
                    [Description] , 
                    [Price] ,
                    [Image] ,
                    [Vendor] 
                FROM [dbo].[CRONUS International Ltd_$Produit$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [No_] = @No_
            `);

        res.status(200).json({ data: produit.recordset[0] });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

async function updateProduit(req, res) {
    try {
        const pool = await connectDB();
        const { description, Price, Vendor } = req.body;
        const { id } = req.params;


        const updateQuery = `
            UPDATE [dbo].[CRONUS International Ltd_$Produit$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
            SET [Description] = @Description, 
                [Price] = @Price, 
                [Vendor] = @Vendor
            WHERE [No_] = @No_
        `;

        const result = await pool.request()
            .input('Description', sql.NVarChar, description)
            .input('Price', sql.Decimal, Price)
            .input('Vendor', sql.NVarChar, Vendor)
            .input('No_', sql.NVarChar, id)
            .query(updateQuery);

        if (result.rowsAffected[0] === 0) {
            return res.status(400).json({ error: "La mise à jour a échoué. Aucune ligne affectée." });
        }

        res.status(200).json({ message: "Produit mis à jour avec succès." });

    } catch (err) {
        console.error("Erreur lors de la mise à jour du produit:", err);
        res.status(400).json({ error: err.message });
    }
}


async function deleteProduit(req, res) {
    try {
        const pool = await connectDB();
        const { id } = req.params;


        const deleteQuery = `
            DELETE [dbo].[CRONUS International Ltd_$Produit$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
            WHERE [No_] = @No_
        `;

        const result = await pool.request()
            .input('No_', sql.NVarChar, id)
            .query(deleteQuery);

        if (result.rowsAffected[0] === 0) {
            return res.status(400).json({ error: "La suppression a échoué." });
        }

        res.status(200).json({ message: "Produit est supprimé avec succès." });

    } catch (err) {
        console.error("Erreur lors de suppression du produit:", err);
        res.status(400).json({ error: err.message });
    }
}




module.exports = { add, getall, getProductDetails, updateProduit, deleteProduit }