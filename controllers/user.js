const personas = require('../public/constantes');

exports.getAll = function(done){
  return done(null, personas.personas);
};

exports.getAllArray = function(done){
  let result=[];
  for(let i=0; i<personas.personas.length; i++){
    result.push([personas.personas[i].id, personas.personas[i].nombre]);
  }
  return done(null, result);
};

exports.getById = function(actividadId, done){
  
  return done(null, []);
};