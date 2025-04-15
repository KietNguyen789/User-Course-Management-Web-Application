var express = require('express');
var router = express.Router();
const SiteController = require('../app/controllers/SiteController');

// path cap 2 va function handler
router.get('/search', SiteController.search); // luongeta xuong duoi
router.post('/signin', SiteController.signin);
router.get('/', SiteController.index);

module.exports = router;
