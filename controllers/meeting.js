const constantes = require('../public/constantes'),
  moment = require('moment');

var calcularRangos = (duracion, horaInicio, horaFin, lunchInicio, lunchFin) => {
  let result = [];
  let horaTemp = horaInicio;
  console.log(horaTemp);
  while (horaTemp.isBefore(horaFin)) {
    if (horaTemp.isBetween(lunchInicio, lunchFin, null, '[]')) {
      horaTemp = lunchFin;
    }
    result.push({
      horaInicial: horaTemp.format("HH:mm"),
      horaFinal: horaTemp.add(duracion, 'm').format("HH:mm"),
      personasLibres: []
    });
  }
  return result;
}

var agruparReuniones = (rangos, listaPersonas, duracion) => {
  let data = [];
  //Por cada rango, recorreremos Personas para obtener sus reuniones
  for (let i = 0; i < listaPersonas.length; i++) {
    let persona = listaPersonas[i];
    let fila = [persona.nombre];
  //Recorremos cada rango
  for (let r = 0; r < rangos.length; r++) {
    let horaInicioRango = moment(rangos[r].horaInicial, "HH:mm");
    let horaFinRango = moment(rangos[r].horaFinal, "HH:mm");
    let estaLibre = true;
      //Por cada reunion verificamos si alguna esta dentro del rango
      for (let j = 0; j < persona.reuniones.length; j++) {
        let reunion = persona.reuniones[j];
        let horaInicioReunion = moment(reunion, "HH:mm");
        let horaFinReunion = moment(reunion, "HH:mm").add(duracion, 'm');
        //Si la reunion se encuentra entre los horarios del rango, la persona no esta libre
        if (horaInicioReunion.isBetween(horaInicioRango, horaFinRango, null, '[)') ||
          horaFinReunion.isBetween(horaInicioRango, horaFinRango, null, '(]')) {
          estaLibre = false;
          fila.push('X');
          break;
        }
      }
      if(estaLibre) fila.push('');
    }
    data.push(fila);
  }
  return data;
}

exports.getAll = function (done) {
  return done(null, constantes.personas);
};

exports.getAllArray = function (done) {  
  var duracion = constantes.duracion;
  var horaInicio = moment(constantes.horaInicio, "HH:mm");
  var horaFin = moment(constantes.horaFin, "HH:mm");
  var lunchInicio = moment(constantes.lunchInicio, "HH:mm");
  var lunchFin = moment(constantes.lunchFin, "HH:mm");
  let listaPersonas = constantes.personas;
  //Calculamos los rangos de duración de las reuniones
  let rangos = calcularRangos(duracion, horaInicio, horaFin, lunchInicio, lunchFin);
  //Armamos nombres de columnas
  let columns = ["Persona"];
  for(let i=0; i<rangos.length; i++){
    columns.push(rangos[i].horaInicial);
  }
  //Recorreremos los rangos horarios y agregaremos las personas libres en cada uno
  let resultado = agruparReuniones(rangos, listaPersonas, duracion);
  
  return done(null, {columns, resultado});
};

exports.getById = function (done) {
  return done(null, constantes.personas);
};