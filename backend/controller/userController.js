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
            INSERT INTO [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2] (No_, Email, Password, FirstName, LastName, Role,Verified, ProfileImage,Secret,City,PostalCode,Biography,Phone,Gender,Country,Address,OccupationUser,CompagnyUser)
            VALUES (@No_, @Email, @Password, @FirstName, @LastName, @Role,@Verified,@ProfileImage, @Secret,@City,@PostalCode,@Biography,@Phone,@Gender,@Country,@Address,@OccupationUser,@CompagnyUser)
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
            .input('City', sql.NVarChar, '')
            .input('PostalCode', sql.NVarChar, '')
            .input('Biography', sql.NVarChar, '')
            .input('Phone', sql.NVarChar, '')
            .input('Gender', sql.NVarChar, '')
            .input('Country', sql.NVarChar, '')
            .input('Address', sql.NVarChar, '')
            .input('OccupationUser', sql.NVarChar, '')
            .input('CompagnyUser', sql.NVarChar, '')



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

async function updateUser(req, res) {
    try {
        const { No_, FirstName, LastName, ProfileImage, City, PostalCode, Biography, Phone, Gender, Country, Address, OccupationUser, CompagnyUser } = req.body;

        // Validate required fields
        if (!No_) {
            return res.status(400).json({
                message: "L'identifiant de l'utilisateur (No_) est requis.",
                error: true,
                success: false,
            });
        }

        // Check if the ProfileImage is too large
        if (ProfileImage && ProfileImage.length > 40000) {
            return res.status(400).json({
                message: "L'image est trop grande pour être stockée directement dans la base de données.",
                error: true,
                success: false,
            });
        }

        const pool = await connectDB();

        // Check if the user exists
        const checkUserQuery = `
            SELECT COUNT(*) AS userCount
            FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            WHERE No_ = @No_
        `;
        const checkUserResult = await pool.request()
            .input('No_', sql.NVarChar, No_)
            .query(checkUserQuery);

        if (checkUserResult.recordset[0].userCount === 0) {
            return res.status(404).json({
                message: "Utilisateur non trouvé.",
                error: true,
                success: false,
            });
        }

        // Update user details
        const updateUserQuery = `
            UPDATE [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
            SET 
                FirstName = @FirstName,
                LastName = @LastName,
                ProfileImage = @ProfileImage,
                City = @City,
                PostalCode = @PostalCode,
                Biography = @Biography,
                Phone = @Phone,
                Gender = @Gender,
                Country = @Country,
                Address = @Address,
                OccupationUser = @OccupationUser,
                CompagnyUser = @CompagnyUser,
                [$systemModifiedAt] = GETDATE() -- Update the modified timestamp
            WHERE 
                No_ = @No_
        `;

        await pool.request()
            .input('No_', sql.NVarChar, No_)
            .input('FirstName', sql.NVarChar, FirstName || '')
            .input('LastName', sql.NVarChar, LastName || '')
            .input('ProfileImage', sql.NVarChar, ProfileImage || '')
            .input('City', sql.NVarChar, City || '')
            .input('PostalCode', sql.NVarChar, PostalCode || '')
            .input('Biography', sql.NVarChar, Biography || '')
            .input('Phone', sql.NVarChar, Phone || '')
            .input('Gender', sql.NVarChar, Gender || '')
            .input('Country', sql.NVarChar, Country || '')
            .input('Address', sql.NVarChar, Address || '')
            .input('OccupationUser', sql.NVarChar, OccupationUser || '')
            .input('CompagnyUser', sql.NVarChar, CompagnyUser || '')
            .query(updateUserQuery);

        // Return success response
        res.status(200).json({
            data: { No_, FirstName, LastName, ProfileImage, City, PostalCode, Biography, Phone, Gender, Country, Address, OccupationUser, CompagnyUser },
            success: true,
            error: false,
            message: "Utilisateur mis à jour avec succès!",
        });
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
        res.status(500).json({
            message: err.message || "Erreur interne du serveur",
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

            res.redirect("https://portail-reclamtion-mern-erp.onrender.com/auth/login");
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
        
        const result = await pool.request().query`
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
            secure: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        };
        
        // Manually set the cookie header
        // res.setHeader('Set-Cookie', [
        //     `token=${token}; HttpOnly; Secure; SameSite=None; Max-Age=${tokenOptions.maxAge}`,
        // ]);

        // Set the cookie and send the response
        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Connexion réussie",
            token,
            success: true,
        });

        console.log("🔹 Cookies envoyés:", token); // Debugging

    } catch (err) {
        console.error("Erreur:", err); // Debugging
        res.status(500).json({ message: err.message || "Erreur serveur", error: true });
    } 
}

async function userLogout(req, res) {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
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
            .input('userId', req.params.id)
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
async function getVendors(req, res) {
    try {

        const pool = await connectDB();

        const result = await pool.request()
            .query(`
                SELECT 
                   *
                FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
                WHERE [Role] = 2
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        const user = result.recordset; // Define the user variable
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
async function getUserByReclamationId(req, res) {
    try {
      const reclamationId = req.params.id; // Get the reclamation ID from request parameters
  
      const pool = await connectDB(); // Establish DB connection
  
      // Get the reclamation details
      const reclamationResult = await pool.request()
        .input('reclamationId', reclamationId)
        .query(`
          SELECT UserId
          FROM [dbo].[CRONUS International Ltd_$Reclamation$deddd337-e674-44a0-998f-8ddd7c79c8b2]
          WHERE [No_] = @reclamationId
        `);
  
      if (reclamationResult.recordset.length === 0) {
        return res.status(404).json({
          message: "Reclamation not found",
          error: true,
          success: false,
        });
      }
  
      const reclamation = reclamationResult.recordset[0]; // Reclamation details
      const userIdRec = reclamation.UserId; // Get the associated UserId
  
      if (!userIdRec) {
        return res.status(400).json({
          message: "UserId is missing in the reclamation data",
          error: true,
          success: false,
        });
      }
  
      // Get the user details associated with the reclamation
      const userResult = await pool.request()
        .input('userId', userIdRec)
        .query(`
          SELECT FirstName, LastName
          FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
          WHERE [No_] = @userId
        `);
  
      if (userResult.recordset.length === 0) {
        return res.status(404).json({
          message: "User not found",
          error: true,
          success: false,
        });
      }
  
    
      // Return both reclamation and user details
      res.status(200).json({ data: userResult.recordset[0] });

    } catch (err) {
      console.error("Error in getUserByReclamationId:", err); // Log error for debugging
      res.status(500).json({
        message: err.message || "Internal server error",
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

async function updateUserRole(req, res) {
    const { No_, Role } = req.body; 
    console.log("l id :", No_ )
    console.log("l Role :", Role )

    const query = `
        UPDATE [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
        SET
            [Role] = @Role
        WHERE [No_] = @No_
    `;

    try {
        const request = new sql.Request();
        request.input('Role', sql.Int, Role); 
        request.input('No_', sql.NVarChar, No_); 

        await request.query(query);

        res.status(200).json({ success: true, message: "User role modifié avec succès" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: "Erreur dans la modification", details: err });
    }
}



async function deleteUser(req, res) {
    try {
      const pool = await connectDB();
      const { No_ } = req.body;  
        console.log("id :", No_)
      await pool.request()
        .input('No_', No_)
        .query(`
          DELETE FROM [dbo].[CRONUS International Ltd_$User_Details$deddd337-e674-44a0-998f-8ddd7c79c8b2]
          WHERE [No_] = @No_
        `);
  
      res.status(200).json({
        error: false,
        success: true,
        message: "User supprimé avec succès"
      });
    } catch (err) {
      console.error("Erreur dans suppression d'utilisateur:", err);
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
      });
    }
  }
  


module.exports = {  SignUp,getVendors, userVerify,getUserByReclamationId,getUser,updateUser, userDetails,updateUserRole, SignIn, userLogout, getall, deleteUser }