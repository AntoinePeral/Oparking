const {Router} = require('express');
//  Ou 
// const express = require ('express');
// const router = express.Router();

const carsRouter = Router();
const carsController = require('../controllers/carsController');

// Nos routes vers Cars
carsRouter.get ('/', carsController.getAllCarsWithPerson);
carsRouter.get('/:carId', carsController.getOne)
carsRouter.post('/', carsController.addCar);
carsRouter.put('/:carId', carsController.update);
carsRouter.delete('/:carId', carsController.delete)

module.exports= carsRouter