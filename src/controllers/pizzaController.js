import { Router } from "express";
import Pizza from "./../models/pizza.js";
import PizzaService from "./../services/pizzas-services.js"
const router = Router();
const svc = new PizzaService();

    router.get('/getAll', async (req, res) => {
        console.log("Entre oficialmente a ControllerPizza");
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

    router.post('/insert', async (req, res) => {
        let resultado = null;
           let pizza = new Pizza ();
           pizza.nombre = req.body.Nombre;
           pizza.libreGluten = req.body.LibreGluten;
           pizza.importe = req.body.Importe;
           pizza.descripcion = req.body.Descripcion;
          console.log(pizza);
          resultado = await svc.insert(pizza);
          return res.status(200).json(resultado);
         
       
      
      })

      
      router.put('/update/:id', async function (req,res) {

        let pizza = new Pizza ();
          pizza.id = req.params.id;
          pizza.nombre = req.body.Nombre;
           pizza.libreGluten = req.body.LibreGluten;
           pizza.importe = req.body.Importe;
           pizza.descripcion = req.body.Descripcion;
          console.log(pizza);
          let resultado = null;
         resultado = await svc.update(pizza)
        return res.status(200).json(resultado);
      })

      router.delete('/delete/:id', async (req, res) => {
        let resultado = await svc.deleteById(req.params.id);
        return res.status(200).json(resultado);
      })


export default router;