
const button = document.getElementById('buttonBuscar');

button.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista 
    fetch('/peliculas?title='+title(), {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = "";
        data.forEach((peli)=>
        {
            lista = lista + "<div> <img src="+peli.poster+">";
            lista = lista + "<p>"+peli.title + " (" + peli.year+")</p>";
            lista = lista + "<p> Rating: "+peli.imdb+"</p> <div>";
        })
        const divRes = document.getElementById("resultados");
        divRes.innerHTML = lista;
        const divSearchResults = document.getElementById("search");
        divSearchResults.innerHTML = "<p> Se han encontrado " + data.length + " resultados para tu busqueda. </p>"
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });

   

});


const title = () => {
  return document.getElementById("input-title").value;
}