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


}
