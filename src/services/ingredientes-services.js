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

    getByIdPizza = async (id) => {
        
        let returnEntity = null;
        console.log('Estoy en getById ingredientexPizza');
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                                .input('pId', sql.Int, id)
                                                    .query(`SELECT 
                                                    Ingredientes.Id, 
                                                    Ingredientes.Nombre,
                                                    Cantidad,
                                                    Unidades.Id, 
                                                    Unidades.Nombre as NombreUnidad
                                                FROM IngredientesXPizzas
                                                INNER JOIN Ingredientes ON IngredientesXPizzas.idIngrediente = Ingredientes.Id
                                                INNER JOIN Unidades ON IngredientesXPizzas.idUnidad = Unidades.Id
                                                WHERE IdPizza = @pId`);
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
            console.log(error);
        }
        return returnEntity;
    }





}

export default IngredientesService;