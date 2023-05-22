

function getAll () {
    /*let top = document.getElementById("top").value
    let orderField = document.getElementById("orderField").value
    let sortOrder = document.getElementById("sortOrder").value
    console.log(top);
*/
    axios
    .get("http://localhost:3000/getAll")

    .then((result) => {
        var resultado = result.data
        console.log(resultado);
            
            let table = '<table class="table table-striped table-hover">';
            table += `<thead class="table-dark"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Descripcion</th><th class="col-2 text-center">Importe</th><th class="col-1 text-center">Libre Gluten</th></tr></thead>`;
            
            resultado.forEach((unPizza, index) => {
                table += `<tr>`;
                table += `<td scope="col" class="text-center">${unPizza.Id}</td>`;
                table += `<td scope="col">${unPizza.Nombre}</td>`;
                table += `<td scope="col">${unPizza.Descripcion}</td>`;
                table += `<td scope="col" class="text-center">${unPizza.Importe}</td>`;
                table += `<td scope="col" class="text-center">${unPizza.LibreGluten}</td>`;
                table += `</tr>`;
              });
              table += "</table>";
              document.getElementById("pizzas-list").innerHTML = table;
        
            })
    

    .catch((error) => {
        console.log(error);
    })

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
    })

    .catch((error) => {
        console.log(error);
    })

    }



function update () {
    Id = document.getElementById("textId").value;
    url = "http://localhost:3000/update/" + Id;

    const ObjPizza [
        {
            Id = document.getElementById("textId").value,
        Nombre = document.getElementById("textNombre").value,
        }
        
    ];
        

    
    axios
    .get(url)

    .put ()

}