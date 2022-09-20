
const button = document.getElementById('buttonBuscar');
const buttonEspecifica = document.getElementById('buttonEspecifica');
const buttonRandom = document.getElementById('buttonRandom');

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
          lista = lista + "<div id='peli'>"
          if (peli.poster != null)
            lista = lista + "<img src="+peli.poster+">";
          lista = lista + "<p>"+peli.title + " (" + peli.year+")</p>";
          if (peli.imdb != null)
            lista = lista + "<p> Rating IMDB: "+peli.imdb.rating+"</p>";
          if (peli.tomatoes != null)
            lista = lista + "<p> Rating RottenTomatoes: "+peli.tomatoes+"</p>";
          if (peli.metacritic != null)
            lista = lista + "<p> Rating Metacritic: "+peli.metacritic+"</p>";
          lista = lista + "</div>"
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

buttonEspecifica.addEventListener('click', function(e) {
  // realizar la busqueda y generar la lista 
  fetch('/peliculas-filtradas', {method: 'GET'})
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
        lista = lista + "<div id='peli'>"
        if (peli.poster != null)
          lista = lista + "<img src="+peli.poster+">";
        lista = lista + "<p>"+peli.title + " (" + peli.year+")</p>";
        if (peli.imdb != null)
          lista = lista + "<p> Rating IMDB: "+peli.imdb.rating+"</p>";
        if (peli.tomatoes != null)
          lista = lista + "<p> Rating RottenTomatoes: "+peli.tomatoes+"</p>";
        if (peli.metacritic != null)
          lista = lista + "<p> Rating Metacritic: "+peli.metacritic+"</p>";
        lista = lista + "</div>"
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


buttonRandom.addEventListener('click', function(e) {
  // realizar la busqueda y generar la lista 
  fetch('/pelis-random', {method: 'GET'})
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
        lista = lista + "<div id='peli'>"
        if (peli.poster != null)
          lista = lista + "<img src="+peli.poster+">";
        lista = lista + "<p>"+peli.title + " (" + peli.year+")</p>";
        if (peli.imdb != null)
          lista = lista + "<p> Rating IMDB: "+peli.imdb.rating+"</p>";
        if (peli.tomatoes != null)
          lista = lista + "<p> Rating RottenTomatoes: "+peli.tomatoes+"</p>";
        if (peli.metacritic != null)
          lista = lista + "<p> Rating Metacritic: "+peli.metacritic+"</p>";
        lista = lista + "</div>"
      })
      const divRes = document.getElementById("resultados");
      divRes.innerHTML = lista;
      
      fetch('/peliculas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          title: 'TADW Presenta: '+data[0].title,
          fullplot: data[1].fullplot,
          cast: data[2].cast,
          poster: data[3].poster,
          year: data[4].year
        })
      })
      return;
  } )
  .catch(function(error) {
    console.log(error);
  });
});