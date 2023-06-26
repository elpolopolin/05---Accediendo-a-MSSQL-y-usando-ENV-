

class middlewareClase{

    tiempoTranscurridoMiddleware = (req, res, next) => {
        const inicio = Date.now(); // Capturar el tiempo de inicio en milisegundos
        // Llamar a next() para continuar con el siguiente middleware o la ruta manejadora
        next();
        const fin = Date.now(); 
        const tiempoTranscurrido = fin - inicio; // Calcular el tiempo transcurrido en milisegundos
        console.log(`Tiempo transcurrido: ${tiempoTranscurrido} ms`); //lo consologeo, la verdad no caze como meterlo en el postman ):
      };


        createdBy = (req, res, next) => { 
        res.SetHeader(`Created By Polansky, Guffson y Rocosso`); //no funkaaaa (o si)
        next();
        };
}

export default middlewareClase;