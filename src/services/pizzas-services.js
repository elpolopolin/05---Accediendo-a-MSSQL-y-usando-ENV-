import config from "../../dbconfig";
import sql, { pool } from 'mssql';
import Pizza, { pool } from './../models/pizza.js'

class PizzaService {

getAll = async () => { 
    let returnEntity = null;
    console.log('estoy en PizzasServices.getById(id)');
    try {
        let pool    = await sql.connect(config);
        let result  = await pool.request()
                                            .query('SELECT * FROM Pizzas')
        returnEntity = result.recordset[0];
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
        console.log(error);
    }
    return returnEntity;
}

insert = async (pizza) => {
    let rowsAffected = 0;
console.log('estoy en:  PizzasService.insert(id)');
try {
    let pool    = await sql.connect(config);
    let result = await pool.request()
                                    .input('pNombre', sql.VarChar, pizza.nombre)
                                    .input('pLibreGluten', sql.Bit, pizza.LibreGluten)
                                    .input('pImporte', sql.Float, pizza.Importe)
                                    .input('pDescripcion', sql.VarChar, pizza.Descripcion)

                                    .query('Insert into Pizzas (Nombre,LibreGluten,Importe, Descripcion) Values (pNombre, pLibreGluten, pImporte, pDescripcion ) ')
    rowsAffected = result.rowsAffected;
} catch (error) {
    console.log(error);
}
                                    
return rowsAffected;
}

update = async (Pizza) => {

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
