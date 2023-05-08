import config from "./dbconfig.js";
import sql from 'mssql';
import PizzaService from "./src/services/pizzas-services.js";
import Pizza from "./src/models/pizza.js";
import express from "express";


const app = new express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
  })

//1
let svc = new PizzaService()
let resultado = await svc.getAll();
console.log( resultado);
//2
let svc2 = new PizzaService()
let resultado2 = await svc.getById(4);
console.log( resultado2);
//3
let svc3 = new PizzaService()
let pizza = new Pizza ( "pizza de yemen",0, 500, "pizza deliciosa traida de lituana desarrollada a base de pene de perro molido");


let resultado3 = await svc.insert(pizza);
console.log( resultado3);

/*

let pool = await sql.connect(config);
let result = await pool.request().query("SELECT top 2 * from Pizzas");

console.log(result.recordsets.length) //recuento de conjuntos de registros devueltos por el procedimiento
console.log(result.recordsets[0].length) //recuento de filas devueltas en el primer conjunto de registros
console.log(result.recordsets[0]) // primer registro de los registros
console.log(result.recordsets)
console.log(result.returnValue) // procedimiento devuelve valor
console.log(result.output) // key/value coleccion de valores de salida
console.log(result.rowsAffected) // el numero de rows (filas) afectados por las declaraciones ejecutadas

process.exit();
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })