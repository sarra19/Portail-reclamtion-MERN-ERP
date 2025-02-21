const { sql, connectDB } = require("../config/dbConfig")
const serviceModel = require("../models/serviceModel");

async function add(req, res) {
    try {
        const pool = await connectDB();

        const query = `
            INSERT INTO [dbo].[CRONUS International Ltd_$Service$deddd337-e674-44a0-998f-8ddd7c79c8b2] 
            ([Image], [Name], [Description], [Tags])
            VALUES
            ( @Image, @Name, @Description, @Tags)
        `;

        await pool.request()
            .input('Image', sql.NVarChar, req.body.Image)
            .input('Name', sql.NVarChar, req.body.Name)
            .input('Description', sql.NVarChar, req.body.Description)
            .input('Tags', sql.NVarChar, req.body.Tags)
            .query(query);

        res.status(200).send("Service added successfully");

    } catch (err) {
        console.error("Error adding service:", err);
        res.status(400).send({ error: err.message });
    }
}

async function getall(req, res) {

    try {
        const pool = await connectDB();

        const result = await pool.request().query(`
              SELECT 
             *
  FROM [Demo Database BC (24-0)].[dbo].[CRONUS International Ltd_$Service$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            `);
        const data = result.recordset
        console.log("data :", data)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la récupération des produits', details: err.message });
    }
}

async function updateService(req, res) {
    try {
        await serviceModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getServiceDetails(req, res) {
    try {
        const pool = await connectDB();

        const produit = await pool.request()
            .input('No_', sql.NVarChar, req.params.id)
            .query(`
                 SELECT 
                [timestamp]
                ,[No_] 
                ,[Image] 
                ,[Name] 
                ,[Description] 
                ,[Tags]
      
  FROM [Demo Database BC (24-0)].[dbo].[CRONUS International Ltd_$Service$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [No_] = @No_
            `);

        res.status(200).json({ data: produit.recordset[0] });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}
async function deleteService(req, res) {
    try {
        await serviceModel.findByIdAndDelete(req.params.id);
        res.status(200).send("service deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getServiceDetails, updateService, deleteService }