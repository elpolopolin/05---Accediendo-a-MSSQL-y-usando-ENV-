import { Router } from "express";
import Pizza from "./../models/pizza.js";
import IngredientesService from "./../services/ingredientes-services.js"
const router = Router();
const svc = new IngredientesService();

router.get('/getAll', async (req, res) => {
    console.log("Entre oficialmente a CONTROLLERingredientes");
    let resultado = await svc.getAll();
   return res.status(200).json(resultado);
});
