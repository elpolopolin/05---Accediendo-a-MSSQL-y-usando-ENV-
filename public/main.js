function getAll () {
    /*let top = document.getElementById("top").value
    let orderField = document.getElementById("orderField").value
    let sortOrder = document.getElementById("sortOrder").value
    console.log(top);
*/
    axios
    .get("http://localhost:3000/getAll")

    .then((result) => {
        console.log(result.data);
    })

    .catch((error) => {
        console.log(error);
    });
}