const {DataTypes, Model} = require('sequelize');
const sequelize =require('../database');

class Person extends Model {}

Person.init ({
  firstname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  tableName: "person",
  modelName: "Person"
})

module.exports = Person;