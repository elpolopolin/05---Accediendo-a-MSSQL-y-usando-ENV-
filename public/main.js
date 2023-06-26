



function getAll () {

    axios
    .get("http://localhost:3000/api/getAll")

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
                table += `<td scope="col" class="text-center"><button onclick="eliminar(${unPizza.Id})">Eliminar</button></td>`;
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
        let olop = '<ul class="list-group">';
        let html = "";
        document.getElementById("pizzas-list").innerHTML = "";
        url = "http://localhost:3000/ingredientes/api/getbyid/" + id;
        axios
        .get(url)

        .then((result) => {

            var resultado = result.data;
            console.log(resultado);

            resultado.forEach((unResultado, i) => {
    
                olop += ` <li class="list-group-item"><b class="text-danger"> ${unResultado.Nombre}: ${unResultado.Cantidad} ${unResultado.NombreUnidad}</b>  </li>`    
                 
            })  
            olop += '</ul>';
            html += `<br> <center> <b> Ingredientes: </b> <div class="container"> <div class="row">  ${olop} </div> </div>  </center>`
            document.getElementById("pizzas-list").innerHTML = html;
            
        })   

    
    }


    


    function eliminar(Id) {
        url = "http://localhost:3000/api/delete/" + Id
        axios.delete(url);

        
       getAll();
        
    }

function getByid () {
        document.querySelector("#pizza-byId").innerHTML = "";
        Id = document.getElementById("textId").value;
        document.querySelector("#textId").innerHTML = "";
        url = "http://localhost:3000/api/getbyid/" + Id;
        
        axios
    .get(url)

    .then((result) => {
        
        var resultado = result.data;
        console.log(resultado);
        let ingre = '<p class="text-danger">';
        let pizza = `<ul>Pizza: ${Id}`;
        pizza += `<li> Nombre: ${resultado.Nombre} </li> `
        pizza += `<li> Descripcion: ${resultado.Descripcion} </li> `
        pizza += `<li> Importe: ${resultado.Importe} </li> `
        pizza += `<li> libreGluten: ${resultado.LibreGluten} </li> </ul> `
        pizza += `<b>Ingredientes</b>`
        resultado.Ingredientes.forEach((unIngrediente, index) => {
            ingre += ` ${unIngrediente.Nombre} ,`
        });
        pizza += `${ingre} </p>`
        document.getElementById("pizza-byId").innerHTML = pizza;
        VerIngredientes2(Id);
    })

    .catch((error) => {
        console.log(error);
    })

    }



function update () {
    id = document.getElementById("textId2").value;
    url = "http://localhost:3000/api/update/" + id;

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

    url = "http://localhost:3000/api/insert/" ;

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

function getIngredientes() {
    
        axios

        .get("http://localhost:3000/api/ingredientes/getAll")

        .then((result) => {
            var resultado = result.data
            let table = '<table class="table table-striped table-hover">';
            table += `<thead class="table"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th> `

            resultado.forEach((unResultado, index)=> {
                table += `<tr>`;
                table += `<td scope="col" class="text-center">${unResultado.Id}</td>`;
                table += `<td scope="col" class="">${unResultado.Nombre}</td>`;
                table += `</tr>`;
            })

            table += `</table>`;
            document.getElementById("pizzas-list").innerHTML = table;
        });
}


