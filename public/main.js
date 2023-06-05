


function getAll () {

    axios
    .get("http://localhost:3000/getAll")

    .then((result) => {
        var resultado = result.data
        console.log(resultado);
            
            let table = '<table class="table table-striped table-hover">';
            table += `<thead class="table"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Descripcion</th><th class="col-2 text-center">Importe</th><th class="col-1 text-center">Libre Gluten</th></tr></thead>`;
            
            resultado.forEach((unPizza, index) => {

                table += `<tr>`;
                table += `<td scope="col" class="text-center">${unPizza.Id}</td>`;
                table += `<td scope="col">${unPizza.Nombre}</td>`;
                table += `<td scope="col">${unPizza.Descripcion}</td>`;
                table += `<td scope="col" class="text-center">${unPizza.Importe}</td>`;
                table += `<td scope="col" class="text-center">${unPizza.LibreGluten}</td>`;
                table += `<td scope="col" class="text-center"><button onclick="VerIngredientes(${unPizza.Id})">Ver Ingredientes</button></td>`;
                table += `<td scope="col" class="text-center"><button onclick="VerIngredientes(${unPizza.Id})">Eliminar</button></td>`;
                table += `</tr>`;
              });
              table += "</table>";
              document.getElementById("pizzas-list").innerHTML = table;
        
            })
    

    .catch((error) => {
        console.log(error);
    })

    }

    function VerIngredientes (id) {
        console.log("VerIngredientes");
        let html = `<center> <b> Ingredientes </b> <p>` 
        document.getElementById("pizzas-list").innerHTML = "";
        url = "http://localhost:3000/ingredientes/getbyid/" + id;
        axios
        .get(url)

        .then((result) => {

            var resultado = result.data;
            console.log(resultado);

            resultado.forEach((unResultado, i) => {

                
                url2 = "http://localhost:3000/ingredientes/getIngredienteById/"+ unResultado.IdIngrediente;

                axios
                .get(url2)
                .then((resulta) => {
                    var resultado2 = resulta.data;   
                    console.log(resultado2)   
                    resultado2.forEach((unResultado2, i) => {     
    
                    html += `${unResultado2.Nombre}`
                 })
                 html += `</p> </center>`
                 document.getElementById("pizzas-list").innerHTML = html;
            })
           
            
        })   

       
    })
    
    }

    function getIngredientes () {

        axios
        .get("http://localhost:3000/ingredientes/getAll")
    
        .then((result) => {
            var resultado = result.data
            console.log(resultado);
                
                let table = '<table class="table table-striped table-hover">';
                table += '<h1 class="text-center"> Ingredientes </h1>';
                
                resultado.forEach((unPizza, index) => {
                    table += `<tr>`;
                    table += `<td scope="col" class="text-center">${unPizza.Nombre}</td>`;
                    table += `</tr>`;
                  });
                  table += "</table>";
                  document.getElementById("pizzas-list").innerHTML = table;
            
                })
        
    
        .catch((error) => {
            console.log(error);
        })
    
        }

    


    function eliminar(Id) {
        url = "http://localhost:3000/delete/" + Id;
       
        axios.delete(url);

        getAll();
        
    }

function getByid () {
        document.querySelector("#pizza-byId").innerHTML = "";
        Id = document.getElementById("textId").value;
        document.querySelector("#textId").innerHTML = "";
        url = "http://localhost:3000/getbyid/" + Id;
        
        axios
    .get(url)

    .then((result) => {
        
        var resultado = result.data;
        console.log(resultado);
        let pizza = `<ul>Pizza: ${Id}`;
        pizza += `<li> Nombre: ${resultado.Nombre} </li> `
        pizza += `<li> Descripcion: ${resultado.Descripcion} </li> `
        pizza += `<li> Importe: ${resultado.Importe} </li> `
        pizza += `<li> libreGluten: ${resultado.LibreGluten} </li> </ul> `
        document.getElementById("pizza-byId").innerHTML = pizza;
        VerIngredientes2(Id);
    })

    .catch((error) => {
        console.log(error);
    })

    }



function update () {
    id = document.getElementById("textId2").value;
    url = "http://localhost:3000/update/" + id;

    nombre = document.getElementById("textNombre").value;
    libregluten = document.getElementById("textLibreGluten").checked;
    importe = document.getElementById("textImporte").value;
    descripcion = document.getElementById("textDescripcion").value;

    let objPizza = {
        Id: id,
        Nombre: nombre,
        LibreGluten: libregluten,
        Importe: importe,
        Descripcion: descripcion

    }
    console.log(objPizza);
    
    axios
    
    .put (url, objPizza)

    .then ((result) => {
        console.log(result.data);
        getAll();
        
    })

    .catch((error) => {
        console.log(error);
    })

}

function insert () {

    url = "http://localhost:3000/insert/" ;

    nombre = document.getElementById("textNombre").value;
    libregluten = document.getElementById("textLibreGluten").checked;
    importe = document.getElementById("textImporte").value;
    descripcion = document.getElementById("textDescripcion").value;

    let objPizza = {
        Nombre: nombre,
        LibreGluten: libregluten,
        Importe: importe,
        Descripcion: descripcion

    }
    
    
    axios
    
    .post (url, objPizza)

    .then ((result) => {
        
        getAll();
        
    })

    .catch((error) => {
        console.log(error);
    })

}

function VerIngredientes2 (id) {
    console.log("VerIngredientes");
    let html = `<center> <b> Ingredientes </b>` 
    
    url = "http://localhost:3000/ingredientes/getbyid/" + id;
    axios
    .get(url)

    .then((result) => {

        var resultado = result.data;
        console.log(resultado);

        resultado.forEach((unResultado, i) => {

            
            url2 = "http://localhost:3000/ingredientes/getIngredienteById/"+ unResultado.IdIngrediente;

            axios
            .get(url2)
            .then((resulta) => {
                var resultado2 = resulta.data;   
                console.log(resultado2)   
                resultado2.forEach((unResultado2, i) => {     

                html += ` <p> ${unResultado2.Nombre} </p>`
             })
             
             document.getElementById("pizza-byId").innerHTML += html;
        })
        
        
    })   

   
})

}

