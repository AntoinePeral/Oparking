const {DataTypes, Model} = require('sequelize');
const sequelize =require('../database');

class Car extends Model {}

Car.init ({
  model: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  immatriculation: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  personId: {
    type: DataTypes.INTEGER,
    field: "person_id",
    defaultValue: null
  }
}, {
  sequelize,
  tableName: "car",
  modelName: "Car"
})

module.exports = Car;