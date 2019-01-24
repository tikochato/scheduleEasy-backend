const personas = require('../public/constantes');

exports.getAll = function (done) {
  return done(null, personas.personas);
};

exports.getAllArray = function (done) {
  let result = [];
  let items = personas.personas;
  for (let i = 0; i < items.length; i++) {
    result.push([items[i].id, items[i].nombre]);
  }
  return done(null, result);
};

exports.getById = function (actividadId, done) {

  return done(null, []);
};