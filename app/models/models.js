const Car = require ('./Car');
const Person = require ('./Person');

Person.hasMany(Car, {foreignKey: 'person_id'});
Car.belongsTo(Person, {foreignKey: 'person_id'});