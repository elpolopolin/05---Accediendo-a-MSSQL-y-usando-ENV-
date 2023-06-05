import config from "../../dbconfig.js";
import sql from 'mssql';

class IngredientesService {

    getAll = async () => { 
        let returnEntity = null;
        console.log('estoy en IngredientesServices.getaLL');
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                                .query('SELECT * FROM Ingredientes')
            returnEntity = result.recordset;
            console.log(returnEntity);
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    getById = async (id) => {
        
        let returnEntity = null;
        console.log('Estoy en getById ingredientexPizza');
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                                .input('pId', sql.Int, id)
                                                .query('SELECT * FROM IngredientesXPizzas WHERE idPizza = @pId');
            returnEntity = result.recordsets[0]; //
            console.log(returnEntity);
        } catch (error) {
            res.status(404).send('No se encontró (404)!!');
        }
        return returnEntity;
    }

    getIngredienteById = async (id) => {
        
        let returnEntity = null;
        console.log('Estoy en getIngredienteById');
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                                .input('pId', sql.Int, id)
                                                .query('SELECT Nombre FROM Ingredientes WHERE id = @pId');
            returnEntity = result.recordsets[0]; //
            console.log(returnEntity);
        } catch (error) {
            res.status(404).send('No se encontró (404)!!');
        }
        return returnEntity;
    }





}

export default IngredientesService;