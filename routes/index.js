const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

// router.get('/', (req, res, next) => {
//   res.render('index', {
//     title: 'Members Only',
//   });
// });

router.get('/', index_controller.index);

module.exports = router;
