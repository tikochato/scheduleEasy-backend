const constantes = require('../public/constantes'),
  moment = require('moment');

var calcularRangos = (duracion, horaInicio, horaFin, lunchInicio, lunchFin) => {
  let result = [];
  let horaTemp = horaInicio;
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

var agruparPersonasLibres = (rangos, listaPersonas, duracion) => {
  //Recorremos cada rango para buscar personas libres
  for (let r = 0; r < rangos.length; r++) {
    let horaInicioRango = moment(rangos[r].horaInicial, "HH:mm");
    let horaFinRango = moment(rangos[r].horaFinal, "HH:mm");
    //Por cada rango, recorreremos Personas para obtener sus reuniones
    for (let i = 0; i < listaPersonas.length; i++) {
      let persona = listaPersonas[i];
      //Bandera que nos permitira saber si esta libre o no
      let estaLibre = true;
      //Por cada reunion verificamos si alguna esta dentro del rango, si ninguna esta lo agregamos a personas libres
      for (let j = 0; j < persona.reuniones.length; j++) {
        let reunion = persona.reuniones[j];
        let horaInicioReunion = moment(reunion, "HH:mm");
        let horaFinReunion = moment(reunion, "HH:mm").add(duracion, 'm');
        //Si la reunion se encuentra entre los horarios del rango, la persona no esta libre
        if (horaInicioReunion.isBetween(horaInicioRango, horaFinRango, null, '[)') ||
          horaFinReunion.isBetween(horaInicioRango, horaFinRango, null, '(]')) {
          estaLibre = false;
          break;
        }
      }
      //Si luego de recorrer rangos de horarios la persona estaLibre, la agregamos al rango
      if (estaLibre) rangos[r].personasLibres.push(persona.nombre);
    }
  }
  return rangos;
}

exports.getAll = function (done) {
  //Inicializamos variables
  let duracion = constantes.duracion;
  let horaInicio = moment(constantes.horaInicio, "HH:mm");
  let horaFin = moment(constantes.horaFin, "HH:mm");
  let lunchInicio = moment(constantes.lunchInicio, "HH:mm");
  let lunchFin = moment(constantes.lunchFin, "HH:mm");
  let listaPersonas = constantes.personas;
  //Calculamos los rangos de duración de las reuniones
  let rangos = calcularRangos(duracion, horaInicio, horaFin, lunchInicio, lunchFin);
  //Recorreremos los rangos horarios y agregaremos las personas libres en cada uno
  let resultado = agruparPersonasLibres(rangos, listaPersonas, duracion);
  return done(null, resultado);
};

exports.getAllArray = function (count, done) {  
  //Inicializamos variables
  let duracion = constantes.duracion;
  let horaInicio = moment(constantes.horaInicio, "HH:mm");
  let horaFin = moment(constantes.horaFin, "HH:mm");
  let lunchInicio = moment(constantes.lunchInicio, "HH:mm");
  let lunchFin = moment(constantes.lunchFin, "HH:mm");
  let listaPersonas = constantes.personas;
  //Calculamos los rangos de duración de las reuniones
  let rangos = calcularRangos(duracion, horaInicio, horaFin, lunchInicio, lunchFin);
  //Recorreremos los rangos horarios y agregaremos las personas libres en cada uno
  let resultado = agruparPersonasLibres(rangos, listaPersonas, duracion);
  
  let columns = ["Hora Inicio", "Hora Fin", "Personas Disponibles"];
  let data = [];
  for(let i=0; i<resultado.length; i++){
    if(resultado[i].personasLibres.length >= count){
      data.push([resultado[i].horaInicial, resultado[i].horaFinal, resultado[i].personasLibres.toString()]);
    }
  }

  return done(null, {columns, data});
};
