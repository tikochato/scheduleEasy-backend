# ScheduleEasy-backend
Coding Challenge
_Repositorio de software del servidor de Backend_

##LiveDemo
Se montó el servicio sobre un AWS EC2 al cuál se puede acceder con la siguiente dirección:
http://18.221.186.40:3000/

El backend posee varias rutas con las siguientes funcionalidades:

| Ruta | Descripción |
|:----:|:-----------------:|
| http://18.221.186.40:3000/report/getAllArray/3 | Devolvera el reporte solicitado con los horarios y las personas disponibles para cada horario con un mínimo de personas disponibles (El 3 puede ser sustituido por cualquier otro número de empleados disponibles deseados)|
| http://18.221.186.40:3000/users/getAll/ | Devolvera el listado de empleados con sus horarios de reuniones |
| http://18.221.186.40:3000/meetings/getAllArray/ |Devolvera un objeto con las personas y los horarios en que tiene reunión, utilizado en el reporte de Meetings del frontEnd |

## Requisitos
NodeJS: https://nodejs.org/en/

## Instalación
~~~~
npm install
~~~~

## Ejecutar el Backend
El servidor se ejecuta en el puerto "3000". 
Para ejecutar el servidor en modo normal se ejecuta el siguiente comando:

~~~~
npm start
~~~~

El servidor tambien permite ser ejecutado con hot reload utilizando el siguiente comando en vez del anterior:

~~~~
npm run dev
~~~~

Ahora podemos acceder al servidor en la siguiente dirección:
http://localhost:3000/


## Acceso a los recursos del API
El Api tiene asignada las rutas de los recursos de la siguiente manera para cada nivel:

 * **localhost:3000/users/**

Las acciones para cada uno de las rutas son las siguientes:

|Acción|Método de Conexión |Ruta|Parámetros enviados |Objeto recibido|
|:----:|:-----------------:|:--:|:------------------:|:-------------|
|getAll|GET|ruta/getAll|  vacío | Objeto json con arreglo interior|


 * **localhost:3000/meetings/getAllArray**

Las acciones para cada uno de las rutas son las siguientes:

|Acción|Método de Conexión |Ruta|Parámetros enviados |Objeto recibido|
|:----:|:-----------------:|:--:|:------------------:|:-------------|
|getAllArray|GET|ruta/getAllArray|  vacío | JSON con las personas y los horarios en que tiene reunión|


 * **localhost:3000/report/**

Las acciones para cada uno de las rutas son las siguientes:

|Acción|Método de Conexión |Ruta|Parámetros enviados |Objeto recibido|
|:----:|:-----------------:|:--:|:------------------:|:-------------|
|getAllArray|GET|ruta/getAllArray/:cantidad|  cantidad  mínima de personas disponibles | JSON con los horarios y personas disponibles para cada horario|
