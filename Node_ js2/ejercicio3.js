var url = require('url'); //importamos el modulo url
var adr = 'http://localhost:3000/ejercicio2.html?year=2025'; //aca ponemos el url de nuestra pagina
var q = url.parse(adr, true); //creamos el objeto URL para que funcione en nuestro componente

console.log("tu host es: ",q.host); //mostramos por consola el host
console.log("tu pathname es: ",q.pathname); //la ruta de acceso

var qdata = q.query; //hacemos un objeto con los atributos de nuestra pagina
console.log(qdata.year); //muestra el atributo year