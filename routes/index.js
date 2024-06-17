const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/indexController');
const isAuth = require('./authMidware').isAuth;

router.get('/', index_controller.index);

router.get('/login', index_controller.login_get);

router.post('/login', index_controller.login_post);

router.get('/signup', index_controller.signup_get);

router.post('/signup', index_controller.signup_post);

router.get('/create', isAuth, index_controller.message_create_get);

module.exports = router;
