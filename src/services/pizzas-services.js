import config from "../../dbconfig.js";
import sql from 'mssql';
import Pizza from './../models/pizza.js'
import IngredientesService from './ingredientes-services.js';


class PizzaService {

    getAll = async (incluirIngredientes) => {
        let svc2 = new IngredientesService();
      
        let returnEntity = null;
        console.log('Estoy en PizzasServices.getAll');
        try {
          let pool = await sql.connect(config);
          let result = await pool.request().query('SELECT * FROM Pizzas');
          returnEntity = result.recordset;
      
          if (incluirIngredientes === true) {
            for (let i = 0; i < returnEntity.length; i++) {
              returnEntity[i].Ingredientes = await svc2.getByIdPizza(returnEntity[i].Id);
              console.log(returnEntity[i].Id);
            }
          }
      
          console.log(returnEntity);
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
      };

    getById = async (id, incluirIngredientes) => {
        
        let returnEntity = null;
        console.log('Estoy en: PizzasService.getById(id)');
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                                .input('pId', sql.Int, id)
                                                .query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0]; //
            let svc2=  new IngredientesService();
            
            if (incluirIngredientes === true) {
            returnEntity.Ingredientes = await svc2.getByIdPizza(id);
            }
            
        } catch (error) {
            console.log(error);
        }
        
        return returnEntity;
    }

    insert = async (pizza) => {
        let rowsAffected = 0;
        
        console.log(pizza);

        console.log('estoy en:  PizzasService.insert(id)');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                            .input('pNombre', sql.VarChar, pizza.nombre)
                                            .input('pLibreGluten', sql.Bit, pizza.libreGluten)
                                            .input('pImporte', sql.Float, pizza.importe)
                                            .input('pDescripcion', sql.VarChar, pizza.descripcion)

                                            .query('Insert into Pizzas (Nombre,LibreGluten,Importe, Descripcion) Values (@pNombre, @pLibreGluten, @pImporte, @pDescripcion )')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
                                            
        return rowsAffected;
    }

    update = async (pizza) => {
        let rowsAffected = 0;
        console.log('estoy en:  PizzasService.update(id)');
        try {
            let pool    = await sql.connect(config);
            let result = await pool.request()
                                            .input('pId', sql.Int, pizza.id)

                                            .input('pNombre', sql.VarChar, pizza.nombre)
                                            .input('pLibreGluten', sql.Bit, pizza.libreGluten)
                                            .input('pImporte', sql.Float, pizza.importe)
                                            .input('pDescripcion', sql.VarChar, pizza.descripcion)

                                            .query('UPDATE Pizzas SET Nombre=@pNombre, LibreGluten=@pLibreGluten, Importe=@pImporte, Descripcion=@pDescripcion WHERE id = @pId')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
                                            
        return rowsAffected;
    }

    deleteById = async (id) =>{
        let rowsAffected = 0;
        console.log('estoy en:  PizzasService.deleteById(id)');
        try {

            
            let pool    = await sql.connect(config);
            let result = await pool.request()
                                            .input('pId', sql.Int, id)
                                            .query('DELETE FROM Pizzas WHERE id = @pId')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
                                            
        return rowsAffected;

    }


}
export default PizzaService;
