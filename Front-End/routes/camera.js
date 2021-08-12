const express = require('express');
const router = express.Router();

const cameraCtrl = require('../controllers/camera');

router.get('/', cameraCtrl.getAllCameras);
router.get('/:id', cameraCtrl.getOneCamera);
router.post('/order', cameraCtrl.orderCameras); //lien ajout panier qui doit rediriger vers localhost:3000/camera/order
// localhost:3000/furniture/order

module.exports = router;