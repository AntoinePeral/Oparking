const {Router} = require('express');
const personController = require('../controllers/personController');
const personRouter = Router();

personRouter.get ('/', personController.getAllPerson);
personRouter.get('/:personId', personController.getOne)
personRouter.post('/', personController.addPerson);
personRouter.put('/:personId', personController.update);
personRouter.delete('/:personId', personController.delete)


module.exports= personRouter