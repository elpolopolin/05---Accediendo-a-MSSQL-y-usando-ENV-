import config from "./dbconfig";
import sql from 'mssql';

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