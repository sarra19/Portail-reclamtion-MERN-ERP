const { sql, connectDB } = require("../config/dbConfig")

async function add(req, res) {
    try {
        console.log('data', req.body.name);
        const pool = await connectDB();

        const checkQuery = `
    SELECT COUNT(*) AS count
    FROM [dbo].[CRONUS International Ltd_$Item$437dbf0e-84ff-417a-965d-ed2bb9650972]
    WHERE [No_] = @No_
  `;

        const result = await pool.request()
            .input('No_', sql.NVarChar, req.body.No_)
            .query(checkQuery);

        if (result.recordset[0].count > 0) {
            // If No_ already exists, return an error response
            return res.status(400).send({ error: 'Product No_ must be unique.' });
        }

        const query = `
      INSERT INTO [dbo].[CRONUS International Ltd_$Item$437dbf0e-84ff-417a-965d-ed2bb9650972] 
      ([No_], [Description], [Unit Price], [Vendor No_])
      VALUES
      (@No_, @Description, @UnitPrice, @VendorNo)
    `;

        await pool.request()
            .input('No_', sql.NVarChar, req.body.No_)
            .input('Description', sql.NVarChar, req.body.description)
            .input('UnitPrice', sql.Decimal, req.body.unitPrice)
            .input('VendorNo', sql.NVarChar, req.body.vendorNo)
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
               [timestamp],[No_], [Description], [Unit Price],[Vendor No_]
              FROM [dbo].[CRONUS International Ltd_$Item$437dbf0e-84ff-417a-965d-ed2bb9650972]
            `);

        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la récupération des produits', details: err.message });
    }
}

async function getProduitDetails(req, res) {
    try {
        const pool = await connectDB();

        const produit = await pool.request()
            .input('No_', sql.NVarChar, req.params.id) // Securely bind the parameter
            .query(`
        SELECT 
         [timestamp],
          [No_], 
          [Description], 
          [Unit Price], 
          [Vendor No_]
         
        FROM [dbo].[CRONUS International Ltd_$Item$437dbf0e-84ff-417a-965d-ed2bb9650972]
        WHERE [No_] = @No_
      `);

        res.status(200).json(produit.recordset);


    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}
async function updateProduit(req, res) {
    try {
        const pool = await connectDB();
        const { description, unitPrice, vendorNo } = req.body;
        const { id } = req.params;


        const updateQuery = `
            UPDATE [dbo].[CRONUS International Ltd_$Item$437dbf0e-84ff-417a-965d-ed2bb9650972] 
            SET [Description] = @Description, 
                [Unit Price] = @UnitPrice, 
                [Vendor No_] = @VendorNo
            WHERE [No_] = @No_
        `;

        const result = await pool.request()
            .input('Description', sql.NVarChar, description)
            .input('UnitPrice', sql.Decimal, unitPrice)
            .input('VendorNo', sql.NVarChar, vendorNo)
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
            DELETE [dbo].[CRONUS International Ltd_$Item$437dbf0e-84ff-417a-965d-ed2bb9650972] 
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




module.exports = { add, getall, getProduitDetails, updateProduit, deleteProduit }