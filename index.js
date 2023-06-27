import config from "./dbconfig.js";
import sql from 'mssql';
import PizzaService from "./src/services/pizzas-services.js";
import Pizza from "./src/models/pizza.js";
import express from "express";
import PizzaRouter from "./src/controllers/pizzaController.js";
import IngredientesRouter from  "./src/controllers/ingredientesController.js"
import middlewareClase from "./src/middleware/middlewaresClase.js";
let svc = new PizzaService()

//Un Middleware que agrege en todos los responses un Header "CreatedBy" = "nombre del alumno"

const app = new express();

let middleware = new middlewareClase()

const port = 3000;



app.use(express.json());
app.use(express.static('public'));
//app.use(middleware.tiempoTranscurridoMiddleware());
// app.use(createdBy);

app.use("/api/pizzas", PizzaRouter);
app.use("/api/ingredientes", IngredientesRouter);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })