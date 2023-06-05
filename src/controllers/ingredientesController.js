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

router.get('/getById/:id', async (req, res) => {
    try {
      let resultado = await svc.getById(req.params.id);
     return res.status(200).json(resultado);
      console.log(resultado);
    } catch (res) {
      console.log(error);
    }
     
})

router.get('/getIngredienteById/:id', async (req, res) => {
  try {
    let resultado = await svc.getIngredienteById(req.params.id);
   return res.status(200).json(resultado);
    console.log(resultado);
  } catch (res) {
    console.log(error);
  }
   
})

export default router;
