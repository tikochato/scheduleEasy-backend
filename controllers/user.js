const personas = require('../public/constantes');

exports.getAll = function(done){
  return done(null, personas.personas);
};

exports.getById = function(actividadId, done){
  
  return done(null, []);
};