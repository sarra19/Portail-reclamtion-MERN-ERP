const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/sendEmail");
const jwt = require('jsonwebtoken')
async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const user = new userModel(req.body)
        await user.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}


async function SignUp(req, res) {
    try {
        const { email, motdePasse, prénom, nom, role, imageprofile } = req.body;

        if (!email || !motdePasse || !prénom || !nom) {
            return res.status(400).json({
                message: "Insérer votre coordonnées",
                error: true,
                success: false,
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Utilisateur existe déjà.",
                error: true,
                success: false,
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(motdePasse, salt);

        const tokenData = { email, nom };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "1h",
        });

        const payload = {
            email,
            nom,
            prénom,
            motdePasse: hashPassword,
            role,//role ajoutih mel front
            imageprofile,
            secret: token,
        };

        const newUser = new userModel(payload);
        const saveUser = await newUser.save();

        const verificationUrl = `${process.env.REACT_APP_BACKEND_URL}${saveUser._id}/verify/${token}`;

        await sendEmail({
            recipient_email: email,
            subject: "Vérifier votre Email",
            html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: rgb(241, 94, 26);">Bienvenue dans notre Service!</h2>
              <p>Bonjour ${prénom}${nom},</p>
              <p>Merci pour votre inscription. Pour finaliser votre inscription, veuillez vérifier votre adresse e-mail en cliquant sur le lien ci-dessous :</p>
              <a href="${verificationUrl}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color:rgb(241, 94, 26); color: #ffffff; text-decoration: none; border-radius: 5px;">Vérifier votre Email</a>
              <p>Si le bouton ci-dessus ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :</p>
              <p><a href="${verificationUrl}" style="color:rgb(241, 94, 26);">${verificationUrl}</a></p>
              <p>Merci pour choisir notre service!</p>
          </div>
      `
        });

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "Utilisateur crée avec un succés! Vérifier votre Compte par mail .",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}



async function userVerify(req, res) {
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).send({ message: "Utilisateur n'existe pas" });
        }

        // Verify the token
        jwt.verify(req.params.token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).send({ message: "token invalid our expiré" });
            }

            if (user.verified) {
                return res.status(400).send({ message: "Utilisateur existe déja" });
            }

            user.verified = true;
            user.secret = null;
            await user.save();

            res.redirect("http://localhost:3000/auth/login");
        });
    } catch (error) {
        console.error("Error de veérification email:", error);
        res.status(500).send({ message: "Erreur de serveur" });
    }
}

async function SignIn(req, res) {
    try {
        const { email, motdePasse } = req.body;

        if (!email) {
            throw new Error("Entrer votre email");
        }
        if (!motdePasse) {
            throw new Error("Entrer votre mot de passe");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("Utilisateur n'existe pas");
        }

        if (!user.verified) {
            throw new Error("Vérifier votre email avant de connecter");
        }

        const checkPassword = await bcrypt.compare(motdePasse, user.motdePasse);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOptions = {
                httpOnly: true,
                secure:'production', // Utiliser HTTPS en production
                maxAge: 1000 * 60 * 60 * 24, // 1 jour
            };

            res.cookie("token", token, tokenOptions).status(200).json({
                message: "Connexion réussite",
                data: token,
                success: true,
                error: false
            });

        } else {
            throw new Error("mot de Passe non correcte");
        }

    } catch (err) {
        res.status(400).json({
            message: err.message || "Erreur",
            error: true,
            success: false,
        });
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

async function userDetails(req, res) {
    try {
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: " details d'Utilisateur"
        })

        console.log("utilisateur", user)

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

async function getall(req, res) {
    try {
        const data = await userModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
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
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).send("user deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, SignUp, userVerify, userDetails, SignIn, userLogout, getall, getbyid, updateUser, deleteUser }