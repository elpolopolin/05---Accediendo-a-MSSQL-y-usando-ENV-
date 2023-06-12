import config from "./dbconfig.js";
import sql from 'mssql';
import PizzaService from "./src/services/pizzas-services.js";
import Pizza from "./src/models/pizza.js";
import express from "express";
import PizzaRouter from "./src/controllers/pizzaController.js";
import IngredientesRouter from  "./src/controllers/ingredientesController.js"

let svc = new PizzaService()

//Un Middleware que agrege en todos los responses un Header "CreatedBy" = "nombre del alumno"

const app = new express();

const tiempoTranscurridoMiddleware = (req, res, next) => {
  const inicio = Date.now(); // Capturar el tiempo de inicio en milisegundos

  // Llamar a next() para continuar con el siguiente middleware o la ruta manejadora
  next();

  const fin = Date.now(); 
  const tiempoTranscurrido = fin - inicio; // Calcular el tiempo transcurrido en milisegundos
  
 
  console.log(`Tiempo transcurrido: ${tiempoTranscurrido} ms`); //lo consologeo, la verdad no caze como meterlo en el postman ):
};


const createdBy = (req, res, next) => { 


  res.SetHeader(`Created By Polansky, Guffson y Rocosso`); //no funkaaaa (o si)

  next();
};


const port = 3000;



app.use(express.static('public'));
app.use(express.json());
app.use(tiempoTranscurridoMiddleware);
app.use(createdBy);
app.use("/", PizzaRouter);
app.use("/ingredientes", IngredientesRouter);





 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })