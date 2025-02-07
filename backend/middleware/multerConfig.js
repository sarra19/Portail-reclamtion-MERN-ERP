const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "vocal" || file.fieldname === "fichierJoint") {
            cb(null, "uploads/");
        } else {
            cb(new Error("Champ non reconnu"), false);
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = {
        vocal: ["audio/mp3", "audio/mpeg"],
        fichierJoint: ["application/pdf", "image/png", "image/jpeg"],
    };

    if (allowedMimeTypes[file.fieldname]?.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Format de fichier non accepté"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
