var express = require('express');
var router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/stored/users', meController.storedUsers);
router.get('/trash/users', meController.trashUsers);

module.exports = router;
