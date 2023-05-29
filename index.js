import config from "./dbconfig.js";
import sql from 'mssql';
import PizzaService from "./src/services/pizzas-services.js";
import Pizza from "./src/models/pizza.js";
import express from "express";
import PizzaRouter from "./src/controllers/pizzaController.js";
import IngredientesRouter from  "./src/controllers/ingredientesController.js"


let svc = new PizzaService()
const app = new express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use("/", PizzaRouter);
app.use("/ingredientes", IngredientesRouter);








 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })