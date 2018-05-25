$(document).ready(() => {
$('#searchForm').on('submit', (event) =>{
  let searchText = $('#searchText').val();
  getMovies(searchText);
  event.preventDefault();
});
});

function getMovies(searchText){
axios.get('https://api.themoviedb.org/3/search/movie?api_key=a9632aa4c0a084cd40a2f5f911739ec0&query='+searchText)
.then((response)=> {
  console.log(response);
  let movies = response.data.results;
  let output = '';
  $.each(movies, (index, movie)=>{
    output += `
      <div class="col-md-3">
      <div class="item text-center pb-3 px-2">
      <img src="${'http://image.tmdb.org/t/p/w185/'+movie.poster_path}">
      <h5>${movie.title}</h5>
      <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
      </div>
      </div>
    `;
  });
  $('#movies').html(output);
})
.catch((err)=>{
  console.log(err);
});
}

function movieSelected(id){
sessionStorage.setItem('movieId', id);
window.location = 'movie.html';
return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=a9632aa4c0a084cd40a2f5f911739ec0')
.then((response)=> {
  console.log(response);
  let movie = response.data;

let genre = movie.genres.map(function (event) {
  return event.name;
}).join(', ');
console.log(genre);

let production = movie.production_companies.map(function (event) {
  return event.name;
}).join(', ');
console.log(production);

 output = `
  <div class="row">
   <div class="col-md-4 col-lg-4">
    <img src="${'http://image.tmdb.org/t/p/w185/'+movie.poster_path}" class="thumbnail shadow">
   </div>
   <div class="col-md-8 col-lg-8">
      <h2>${movie.title}</h2>
      <ul class="shadow">
        <li class="List-group-item"><strong>Genre:</strong> ${genre}</li>
        <li class="List-group-item"><strong>Status:</strong> ${movie.status}</li>
        <li class="List-group-item"><strong>Release Date:</strong> ${movie.release_date}</li>
        <li class="List-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
        <li class="List-group-item"><strong>Production Companies:</strong> ${production}</li>
        <li class="List-group-item"><strong>Language:</strong> ${movie.original_language}</li>
        <li class="List-group-item"><strong>Runtime:</strong> ${movie.runtime} min</li>
        <li class="List-group-item"><strong>Tagline:</strong> ${movie.tagline}</li>      
      </ul>
   </div>
  </div>
  <div class="row">
    <div class="well shadow ">
      <h3>Plot</h3>
      ${movie.overview}
      <hr>
      <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
    </div>
  </div>
  `;
  
  

  $('#movies').html(output);
})
.catch((err)=>{
  console.log(err);
});
}

