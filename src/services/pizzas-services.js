import config from "../../dbconfig.js";
import sql from 'mssql';
import Pizza from './../models/pizza.js'


class PizzaService {

    getAll = async () => { 
        let returnEntity = null;
        console.log('estoy en PizzasServices.getaLL');
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                                .query('SELECT * FROM Pizzas')
            returnEntity = result.recordset;
            console.log(returnEntity);
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    getById = async (id) => {
        
        let returnEntity = null;
        console.log('Estoy en: PizzasService.getById(id)');
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                                .input('pId', sql.Int, id)
                                                .query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0]; //
        } catch (error) {
            res.status(404).send('No se encontró (404)!!');
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

    update = async (Pizza) => {
        let rowsAffected = 0;
        console.log('estoy en:  PizzasService.update(id)');
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
