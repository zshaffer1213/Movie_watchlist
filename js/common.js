export function renderMovies(arr, el, button="plus") {
    el.innerHTML = arr.map( movie => {
        const {Poster, Title, Genre, Plot, imdbRating, Runtime, imdbID} = movie
        return `
        <div class="movie-card">
        <img class="poster-img" src='${Poster !== "N/A" ? Poster : '/assets/placeholder.png' }' alt="movie poster of ${Title}">
        <h2 class="movie-title">${Title} <span class="movie-rating"> ${imdbRating !== "N/A" ? "⭐" + imdbRating : ''}</span></h2>
        <p class="movie-runtime">${Runtime}</p>
        <p class="movie-genre">${Genre}</p>
        <button id="${ button === "plus" ? "to" : "remove" }-watchlist" data-id="${imdbID}"><i class="fa-solid fa-circle-${button}" style="color: #ffffff;"></i> ${ button === "plus" ? "Add to watchlist" : "Remove from watchlist" }</button>
        <p class="movie-plot">${Plot}</p>
        </div>
        `
    }).join('')
}


export const movieList = document.getElementById('movie-list')

export const apiKey = "f61879e5"