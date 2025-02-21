const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/sendEmail");
const jwt = require('jsonwebtoken')
const { sql, connectDB } = require("../config/dbConfig")


async function generateUniqueNo(pool) {
    let uniqueNo;
    let isUnique = false;

    while (!isUnique) {
        // Générer un identifiant unique basé sur un préfixe + timestamp + aléatoire
        uniqueNo = `USR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        // Vérifier si `No_` existe déjà
        const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            WHERE [No_] = @No_
        `;
        const checkResult = await pool.request()
            .input("No_", sql.NVarChar, uniqueNo)
            .query(checkQuery);

        if (checkResult.recordset[0].count === 0) {
            isUnique = true; // Le No_ est unique
        }
    }
    return uniqueNo;
}

async function SignUp(req, res) {
    try {
        const { Email, Password, FirstName, LastName, ProfileImage,Verified } = req.body;
        console.log(`Email length: ${Email.length}`);
        console.log(`FirstName length: ${FirstName.length}`);
        console.log(`LastName length: ${LastName.length}`);
        console.log(`password length: ${Password.length}`);
        console.log(`ProfileImage length: ${ProfileImage.length}`);
if (ProfileImage.length > 40000) { // Si la taille dépasse 1000 caractères
    return res.status(400).json({
        message: "L'image est trop grande pour être stockée directement dans la base de données.",
        error: true,
        success: false,
    });
}

       
        if ( !Email || !Password || !FirstName || !LastName ) {
            return res.status(400).json({
                message: "Insérer votre coordonnées",
                error: true,
                success: false,
            });
        }

        const pool = await connectDB();

        const checkUserQuery = `
            SELECT COUNT(*) AS userCount
            FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            WHERE Email = @Email
        `;
        const checkUserResult = await pool.request()
            .input('Email', sql.NVarChar, Email)
            .query(checkUserQuery);

        if (checkUserResult.recordset[0].userCount > 0) {
            return res.status(400).json({
                message: "Utilisateur existe déjà.",
                error: true,
                success: false,
            });
        }

        const No_ = await generateUniqueNo(pool);
        const checkNoQuery = `
        SELECT COUNT(*) AS count
        FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
        WHERE [No_] = @No_
    `;
    const checkNoResult = await pool.request()
        .input('No_', sql.NVarChar, No_)
        .query(checkNoQuery);

    if (checkNoResult.recordset[0].count > 0) {
        return res.status(400).json({
            message: "Le No_ existe déjà.",
            error: true,
            success: false,
        });
    }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(Password, salt);

        const tokenData = { email: Email, nom: LastName };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });

        const insertUserQuery = `
            INSERT INTO [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2] (No_, Email, Password, FirstName, LastName, Role,Verified, ProfileImage,Secret)
            VALUES (@No_, @Email, @Password, @FirstName, @LastName, @Role,@Verified,@ProfileImage, @Secret)
        `;
        await pool.request()
            .input('No_', sql.NVarChar, No_)
            .input('Email', sql.NVarChar, Email)
            .input('Password', sql.NVarChar, hashPassword)
            .input('FirstName', sql.NVarChar, FirstName)
            .input('LastName', sql.NVarChar, LastName)
            .input('Role', sql.Int, 1)
            .input('Verified', sql.Int, 0)
            .input('ProfileImage', sql.NVarChar, ProfileImage)
            .input('Secret', sql.NVarChar, token)
            .query(insertUserQuery);



        const verificationUrl = `${process.env.REACT_APP_BACKEND_URL}${No_}/verify/${token}`;
        await sendEmail({
            recipient_email: Email,
            subject: "Vérifier votre Email",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: rgb(241, 94, 26);">Bienvenue dans notre Service!</h2>
                    <p>Bonjour ${FirstName} ${LastName},</p>
                    <p>Merci pour votre inscription. Pour finaliser votre inscription, veuillez vérifier votre adresse e-mail en cliquant sur le lien ci-dessous :</p>
                    <a href="${verificationUrl}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color:rgb(241, 94, 26); color: #ffffff; text-decoration: none; border-radius: 5px;">Vérifier votre Email</a>
                    <p>Si le bouton ci-dessus ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :</p>
                    <p><a href="${verificationUrl}" style="color:rgb(241, 94, 26);">${verificationUrl}</a></p>
                    <p>Merci pour choisir notre service!</p>
                </div>
            `
        });

        res.status(201).json({
            data: { email: Email, firstName: FirstName, lastName: LastName, ProfileImage:ProfileImage},
            success: true,
            error: false,
            message: "Utilisateur créé avec succès! Vérifiez votre compte par mail.",
        });
    } catch (err) {
        console.error("Error during sign up:", err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}



async function userVerify(req, res) {
    try {
        const pool = await connectDB();


        const user = await pool.request()
            .input('No_', sql.NVarChar, req.params.id)
            .query(`
                SELECT 
                  *
                FROM [CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [No_] = @No_
            `);

        
        if (user.recordset.length === 0) {
            return res.status(400).send({ message: "Utilisateur n'existe pas" });
        }

        jwt.verify(req.params.token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
           

            await pool.request()
                .input('No_', sql.NVarChar, req.params.id)
                .input('Verified', sql.TinyInt, true) 
                .query(`
                    UPDATE [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                    SET [Verified] = @Verified
                    WHERE [No_] = @No_
                `);

            res.redirect("http://localhost:3000/auth/login");
        });
    } catch (error) {
        console.error("Error de vérification email:", error);
        res.status(500).send({ message: "Erreur de serveur" });
    }
}

async function SignIn(req, res) {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: "Email et mot de passe requis", error: true });
        }

        const pool = await connectDB();
        
        const result =await pool.request().query`
            SELECT * FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2] WHERE Email = ${Email}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Utilisateur n'existe pas", error: true });
        }

        const user = result.recordset[0];

        if (!user.Verified) {
            return res.status(403).json({ message: "Vérifiez votre email avant de vous connecter", error: true });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect", error: true });
        }

        const tokenData = {
            id: user.No_, 
            email: user.Email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 8, // 8 heures
        };

        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Connexion réussie",
            token,
            success: true,
        });

    } catch (err) {
        res.status(500).json({ message: err.message || "Erreur serveur", error: true });
    } 
}

async function userLogout(req, res) {
    try {
        const tokenOption = {
            httpOnly: false,
            secure: false, // http -- true
            sameSite: 'lax' //sans http avec localhost   --- none avec http
        }
        res.clearCookie("token", tokenOption)

        res.json({
            message: "Déconnexion réussite",
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
async function getUser(req, res) {
    try {
        console.log("userId", req.params.id);

        const pool = await connectDB();

        const result = await pool.request()
            .input('userId', req.userId)
            .query(`
                SELECT 
                   *
                FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [No_] = @userId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        const user = result.recordset[0]; // Define the user variable
        console.log("utilisateur", user); // Log the user details

        res.status(200).json({
            data: user, // Send the user details in the response
            error: false,
            success: true,
            message: "User details fetched successfully"
        });

    } catch (err) {
        console.error("Error in userDetails:", err); // Log the error for debugging
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}


async function userDetails(req, res) {
    try {
        console.log("userId", req.userId);

        const pool = await connectDB();

        const result = await pool.request()
            .input('userId', req.userId)
            .query(`
                SELECT 
                    [No_],
                    [FirstName],
                    [LastName],
                    [Email],
                    [Password],
                    [ProfileImage],
                    [Address],
                    [Country],
                    [City],
                    [PostalCode],
                    [Biography],
                    [Gender],
                    [Phone],
                    [Role],
                    [Verified],
                    [OccupationUser]
                    ,[CompagnyUser]
                FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [No_] = @userId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        const user = result.recordset[0]; // Define the user variable
        console.log("utilisateur", user); // Log the user details

        res.status(200).json({
            data: user, // Send the user details in the response
            error: false,
            success: true,
            message: "User details fetched successfully"
        });

    } catch (err) {
        console.error("Error in userDetails:", err); // Log the error for debugging
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}


async function getall(req, res) {

    try {
        const pool = await connectDB();

        const result = await pool.request().query(`
              SELECT * FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            `);

        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la récupération des produits', details: err.message });
    }
}
async function updateUser(req, res) {
    try {
        await userModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await userModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteUser(req, res) {
    try {

        const pool = await connectDB();

      await pool.request()
            .input('userId',req.params.id)
            .query(`
                DELETE FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [No_] = @userId
            `);

       
       

        res.status(200).json({
            error: false,
            success: true,
            message: "User supprimé avec succés"
        });

    } catch (err) {
        console.error("Erreur dans suppression d' utilisateur:", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}




module.exports = {  SignUp, userVerify,getUser, userDetails, SignIn, userLogout, getall, getbyid, updateUser, deleteUser }