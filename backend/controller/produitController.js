const { sql, connectDB } = require("../config/dbConfig")

async function addNewProduct(req, res) {
    try {
        console.log('data', req.body.name);
        const { Name, Description, Price, Vendor, Tags, ImageProduct } = req.body;
        console.log('Request Body:', req.body);
        console.log('Name:', Name);
        console.log('Description:', Description);
        console.log('Price:', Price);
        console.log('Vendor:', Vendor);
        console.log('Tags:', Tags);
        console.log('ImageProduct:', ImageProduct);
        const pool = await connectDB();

        const query = `
      INSERT INTO [dbo].[CRONUS International Ltd_$Product$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
      ([Name], [Description], [Price], [Tags],[Vendor],[ImageProduct])
      VALUES
      (@Name, @Description, @Price,@Tags,@Vendor,@ImageProduct)
    `;

        await pool.request()
            .input('Name', sql.NVarChar, Name)
            .input('Description', sql.NVarChar, Description || '')
            .input('Price', sql.Decimal, Price)
            .input('Vendor', sql.NVarChar, Vendor)
            .input('Tags', sql.NVarChar, Tags || '')
            .input('ImageProduct', sql.NVarChar, ImageProduct || '')

            .query(query);

        res.status(201).json({
            success: true,
            error: false,
            message: "produit créée avec succès!",
        });
    } catch (err) {
        console.error("Erreur lors de l'ajout de produit:", err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Erreur lors de l'ajout de produit.",
            details: err.message,
        });
    }
}


async function getall(req, res) {

    try {
        const pool = await connectDB();

        const result = await pool.request().query(`
              SELECT 
               [timestamp],[No_],[Name], [Description],[Price],[ImageProduct],[Vendor]
              FROM [dbo].[CRONUS International Ltd_$Product$deddd337-e674-44a0-998f-8ddd7c79c8b2]
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
                    [ImageProduct] ,
                    [Vendor]
                FROM [dbo].[CRONUS International Ltd_$Product$deddd337-e674-44a0-998f-8ddd7c79c8b2]
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
        const { Name, Description, Price, Vendor, Tags, ImageProduct } = req.body;
        const { id } = req.params;


        const updateQuery = `
            UPDATE [dbo].[CRONUS International Ltd_$Product$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
            SET [ImageProduct]= @ImageProduct,
            [Description] = @Description,
            [Name]=@Name,
            [Tags]=@Tags, 
                [Price] = @Price, 
                [Vendor] = @Vendor
            WHERE [No_] = @No_
        `;

        const result = await pool.request()
        .input('Name', sql.NVarChar, Name)
        .input('Description', sql.NVarChar, Description || '')
        .input('Price', sql.Decimal, Price)
        .input('Vendor', sql.NVarChar, Vendor)
        .input('Tags', sql.NVarChar, Tags || '')
        .input('ImageProduct', sql.NVarChar, ImageProduct || '')
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
        const { No_ } = req.body;
        console.log("id :", No_)
        await pool.request()
            .input('No_', No_)
            .query(`
          DELETE [dbo].[CRONUS International Ltd_$Product$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
            WHERE [No_] = @No_
        `);

        res.status(200).json({
            error: false,
            success: true,
            message: "Produit supprimé avec succès"
        });
    } catch (err) {
        console.error("Erreur dans suppression de produit:", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}






module.exports = { addNewProduct, getall, getProductDetails, updateProduit, deleteProduit }