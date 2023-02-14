const Cars = require('../models/Car');
const Person = require ('../models/Person')
const errors = require('../modules/errors');

const carsController = {
  hello: (req, res)=> {
    res.send('Holla')
  },
  getAllCarsWithPerson: async (req, res) =>{
    const allCars = await Cars.findAll({
      include: Person
    })
    res.json(allCars)
  },
  getOne: async (req, res, next) =>{
    const carId = Number(req.params.carId);
    console.log(carId);
    const car = await Cars.findByPk(carId, {
      include: Person
    });

    if (!car) {
      return next();
    }

    res.json(car)
  },
  addCar : async (req, res) =>{
    const {model, immatriculation, personId} = req.body;

    if (typeof model != 'string' || model.length< 2) {
      errors.error400(res);
    }
    const newCar = await Cars.create({model, immatriculation, personId});
    res.json(newCar)

  },
  update: async function (req, res, next) {
    const carId = Number(req.params.carId);
    console.log(carId);
    const carToUpdate = await Cars.findByPk(carId);

    if (!carToUpdate) {
      return next();
    }

    const carData = {
      model: req.body.model || carToUpdate.model,
      immatriculation: req.body.immatriculation || carToUpdate.immatriculation,
      personId: req.body.personId || carToUpdate.personId
    }

    await carToUpdate.update(carData);
    res.json(carToUpdate)
  },
  delete: async function (req, res, next){
    const carId = Number(req.params.carId);
    const carToDelete = await Cars.findByPk(carId);

    if (!carToDelete) {
      return next();
    }

    await carToDelete.destroy();
    res.json(carToDelete)
  }
}

module.exports = carsController