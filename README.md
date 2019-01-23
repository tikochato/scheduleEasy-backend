# ScheduleEasy-backend
Coding Challenge
_Repositorio de software del servidor de Backend_

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

 * **localhost:3000/users/getAll**

Las acciones para cada uno de las rutas son las siguientes:

|Acción|Método de Conexión |Ruta|Parámetros enviados |Objeto recibido|
|:----:|:-----------------:|:--:|:------------------:|:-------------|
|getAll|GET|ruta/getAll|  vacío | Objeto json con arreglo interior|
|getById|GET|ruta/:id|el id del nivel, se coloca en la ruta (sin los dos puntos)|Objeto json con arreglo interior|
