import { Router } from "express";
import UsuarioService from "../services/usuarios-service.js";
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router = Router();
const svc = new UsuarioService();

router.post('/login', async (req, res) => {
    let entidad = req.body;
    let respuesta;
    let returnEntity
    
    returnEntity = await svc.login(entidad);
    if (returnEntity != null){
        returnEntity.Password = '*'.repeat(10)
        respuesta = res.status(StatusCodes.OK).json(returnEntity);
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`usuario INEXSISTENTE`);
    }
    return respuesta;
});

export default router;