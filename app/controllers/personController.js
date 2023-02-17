const Cars = require('../models/Car');
const Person = require ('../models/Person')
const errors = require('../modules/errors');

const personController = {
  getAllPerson: async (req, res) =>{
    const allPersons = await Person.findAll({
      include: Cars
    })
    res.json(allPersons)
  },
  getOne: async (req, res, next) =>{
    const personId = Number(req.params.personId);
    console.log(personId);
    const person = await Person.findByPk(personId, {
      include: Cars
    });

    if (!person) {
      return next();
    }

    res.json(person)
  },
  addPerson : async (req, res) =>{
    const personData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,

    }

    const newPerson = await Person.create(personData);
    res.json(newPerson)

  },
  update: async function (req, res, next) {
    const personId = Number(req.params.personId);
    console.log(personId);
    const personToUpdate = await Person.findByPk(personId);

    if (!personToUpdate) {
      return next();
    }

    const personData = {
      firstname: req.body.firstname || personToUpdate.firstname,
      lastname: req.body.lastname || personToUpdate.lastname,

    }

    await personToUpdate.update(personData);
    res.json(personToUpdate)
  },
  delete: async function (req, res, next){
    const personId = Number(req.params.personId);
    console.log(personId);
    const personToDelete = await Person.findByPk(personId);

    if (!personToDelete) {
      return next();
    }

    await personToDelete.destroy();
    res.json(personToDelete)
  }
}

module.exports = personController