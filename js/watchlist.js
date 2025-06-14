import { renderMovies, apiKey, movieList } from "/js/common.js"

let watchlistMovies = JSON.parse(localStorage.getItem('watchlist'))|| []
let renderList = []

for (const movie of watchlistMovies) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie}`)
    const data = await res.json()
    renderList.push(data)
}

console.log(watchlistMovies)

renderMovies(renderList, movieList)