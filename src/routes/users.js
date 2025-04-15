var express = require('express');
var router = express.Router();
const userController = require('../app/controllers/UserController');
// slug/name/id
router.get('/create', userController.create);
router.post('/store', userController.store);
router.post('/handle-form-action', userController.handleFormActions);
router.put('/:id', userController.update);
router.patch('/:id/restore', userController.restore);
router.delete('/:id', userController.destroy);
router.delete('/:id/force', userController.forceDestroy);
router.get('/:id/edit', userController.edit);
router.get('/:slug', userController.show);

//router.get('/', userController.index);

module.exports = router;
