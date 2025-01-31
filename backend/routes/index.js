const express = require('express');
const router = express.Router();
const serviceController=require("../controller/serviceController");
const produitController=require("../controller/produitController");


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


module.exports = router;
