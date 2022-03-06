const express = require('express');
const router = express.Router();

// require controller
const usercontroller = require('../controllers/userController');


router.get('/',usercontroller.index);
router.get('/home',usercontroller.home);
// router.get('/find',usercontroller.find);
router.get('/adduser',usercontroller.form);
router.post('/adduser',usercontroller.create);
router.get('/edit/:id',usercontroller.edit);
router.get('/delete/:id',usercontroller.delete);






module.exports =router;