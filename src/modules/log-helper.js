import logConfiguration from "./log-helper-config.js"
import fs from 'fs'

class logHelper {

    getFileName = ()  => {
        let returnValue;
        returnValue = `${logConfiguration.logFolder}errores.txt`;
        return returnValue
    }

    logError = async (text, error) => {
        let linea;
        let errorFileName = this.getFileName();
        
    }
}