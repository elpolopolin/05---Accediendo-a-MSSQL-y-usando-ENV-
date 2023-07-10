
import sql from 'mssql'
import config from '../../dbconfig.js';
import logHelper from  './../modules/log-helper.js'
import crypto from 'crypto'


const NOMBRE_SERVICE = 'UsuariosService';
const NOMBRE_TABLA = 'Usuarios';

class UsuarioService {

    login = async (usuario) => {
        let returnEntity = null;
        let token;

        returnEntity = await this.getByUserNamePassword(
            usuario.UserName,
            usuario.Password
        );
        if (returnEntity != null){
           token = await this.refreshTokenById(returnEntity.Id);
           //si se encuentra el usuario entonces le crea un nuevo Token Luego vuelve a buscar el usuario con el token modificado..
           if(token != null){
            returnEntity = await this.getByUserNamePassword(
                usuario.UserName,
                usuario.Password
            );
           }
        }
        return returnEntity
    }

    getByUserNamePassword= async(userName, password) =>
    {
        let returnEntity=null;

        try
        {
            let pool= await sql.connect(config);
            let result = await pool.request()
                        .input ('pUserName', sql.VarChar, userName)
                        .input ('pPassword', sql.VarChar, password)
                        .query (`SELECT * FROM ${NOMBRE_TABLA} WHERE UserName=@pUserName`)

                        returnEntity=result.recordset[0];
        }
        catch(error){
            logHelper.logError(`${NOMBRE_TABLA} -> getByUserNamePassword`,error)

        }
        return returnEntity;

    }

    getByToken = async (token) => {

        let returnEntity = null;

        try{
            let pool= await sql.connect(config);
            let result = await pool.request()
            .input ('pToken', sql.VarChar, token)
            .query (`SELECT * FROM ${NOMBRE_TABLA} WHERE Token=@pToken `)

            returnEntity = result.recordsets[0][0];

        }
        catch (error){
            logHelper.logError(`${NOMBRE_TABLA} -> getByToken`,error);
        }
        return returnEntity;
    }

    

    addMinutes = (minutes, date) => { //le llega los minutos que durara el token valido y el date (fecha Hoy)
        date = date || new Date();
    
        if (typeof minutes !== 'number') {
            throw new Error('invalid "minutes" argument')
        }

        if (!(date instanceof Date)){
            throw new Error('invalid "date" argument')
        }
        date.setMinutes(date.getMinutes() + minutes)

        return date;
    }


    refreshTokenById= async(id) => {
        let rowsAffected=0;
        let token = crypto.randomUUID();
        let expirationDate = this.addMinutes(15,new Date ());

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                            .input ('pToken', sql.VarChar, token)
                                            .input ('pId', sql.Int, id)
                                            .input ('pTokenExpirationDate', sql.VarChar, expirationDate.toISOString())
                                            .query (`UPDATE ${NOMBRE_TABLA} SET
                                                    Token = @pToken,
                                                    TokenExpirationDate = @pTokenExpirationDate
                                                    WHERE Id = @pId`);

            rowsAffected = result.rowsAffected;
            console.log(rowsAffected);
        }
        catch (error) {
            console.log(error);
            logHelper.logError(`${NOMBRE_SERVICE}->updateTokenById`, error);
        }
        return rowsAffected;
    }


}
export default UsuarioService;