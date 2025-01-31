const express = require('express');
const router = express.Router();
const serviceController=require("../controller/serviceController");
const produitController=require("../controller/produitController");
const appelController=require("../controller/appelController");
const chatController=require("../controller/chatController");
const commentaireController=require("../controller/commentaireController");
const historiqueController=require("../controller/historiqueController");
const interventionController=require("../controller/interventionController");
const messageController=require("../controller/messageController");
const notificationController=require("../controller/notificationController");
const réclamationController=require("../controller/réclamationController");
const remboursementController=require("../controller/remboursementController");
const réponseController=require("../controller/réponseController");
const userController=require("../controller/userController");

const authToken = require('../middleware/authToken')


//service
router.post("/addService",serviceController.add)
router.get("/getAllService",serviceController.getall)
router.get("/getService/:id",serviceController.getbyid)
router.put('/updateService/:id',serviceController.updateService);
router.delete('/deleteService/:id',serviceController.deleteService);

//produit
router.post("/addProduit",produitController.add)
router.get("/getAllProduit",produitController.getall)
router.get("/getProduit/:id",produitController.getbyid)
router.put('/updateProduit/:id',produitController.updateProduit);
router.delete('/deleteProduit/:id',produitController.deleteProduit);

//appel
router.post("/addAppel",appelController.add)
router.get("/getAllAppel",appelController.getall)
router.get("/getAppel/:id",appelController.getbyid)
router.put('/updateAppel/:id',appelController.updateAppel);
router.delete('/deleteAppel/:id',appelController.deleteAppel);

//chat
router.post("/addChat",chatController.add)
router.get("/getAllChat",chatController.getall)
router.get("/getChat/:id",chatController.getbyid)
router.put('/updateChat/:id',chatController.updateChat);
router.delete('/deleteChat/:id',chatController.deleteChat);

//commentaire
router.post("/addCommentaire",commentaireController.add)
router.get("/getAllCommentaire",commentaireController.getall)
router.get("/getCommentaire/:id",commentaireController.getbyid)
router.put('/updateCommentaire/:id',commentaireController.updateCommentaire);
router.delete('/deleteCommentaire/:id',commentaireController.deleteCommentaire);

//historique
router.post("/addHistorique",historiqueController.add)
router.get("/getAllHistorique",historiqueController.getall)
router.get("/getHistorique/:id",historiqueController.getbyid)
router.put('/updateHistorique/:id',historiqueController.updateHistorique);
router.delete('/deleteHistorique/:id',historiqueController.deleteHistorique);

//intervention
router.post("/addIntervention",interventionController.add)
router.get("/getAllIntervention",interventionController.getall)
router.get("/getIntervention/:id",interventionController.getbyid)
router.put('/updateIntervention/:id',interventionController.updateIntervention);
router.delete('/deleteIntervention/:id',interventionController.deleteIntervention);

//message
router.post("/addMessage",messageController.add)
router.get("/getAllMessage",messageController.getall)
router.get("/getMessage/:id",messageController.getbyid)
router.put('/updateMessage/:id',messageController.updateMessage);
router.delete('/deleteMessage/:id',messageController.deleteMessage);

//notification
router.post("/addNotification",notificationController.add)
router.get("/getAllNotification",notificationController.getall)
router.get("/getNotification/:id",notificationController.getbyid)
router.put('/updateNotification/:id',notificationController.updateNotification);
router.delete('/deleteNotification/:id',notificationController.deleteNotification);

//réclamation
router.post("/addReclamation",réclamationController.add)
router.get("/getAllReclamation",réclamationController.getall)
router.get("/getReclamation/:id",réclamationController.getbyid)
router.put('/updateReclamation/:id',réclamationController.updateRéclamation);
router.delete('/deleteReclamation/:id',réclamationController.deleteRéclamation);

//Remboursement
router.post("/addRemboursement",remboursementController.add)
router.get("/getAllRemboursement",remboursementController.getall)
router.get("/getRemboursement/:id",remboursementController.getbyid)
router.put('/updateRemboursement/:id',remboursementController.updateRemboursement);
router.delete('/deleteRemboursement/:id',remboursementController.deleteRemboursement);

//Réponse
router.post("/addReponse",réponseController.add)
router.get("/getAllReponse",réponseController.getall)
router.get("/getReponse/:id",réponseController.getbyid)
router.put('/updateReponse/:id',réponseController.updateRéponse);
router.delete('/deleteReponse/:id',réponseController.deleteRéponse);

//User
router.post("/signup",userController.SignUp)
router.get("/:id/verify/:token/", userController.userVerify)
router.post("/signin",userController.SignIn)
router.get("/userLogout",userController.userLogout)

router.get("/getAllUser",userController.getall)
router.get("/getUser/:id",userController.getbyid)
router.get("/user-details",authToken,userController.userDetails)
router.put('/updateUser/:id',userController.updateUser);
router.delete('/deleteUser/:id',userController.deleteUser);



module.exports = router;
