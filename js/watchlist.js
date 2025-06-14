import { renderMovies, apiKey, movieList } from "/js/common.js"

const removeMovieBtn = document.getElementById('remove-watchlist') 
let watchlistMovies = JSON.parse(localStorage.getItem('watchlist'))|| []
let renderList = []

for (const movie of watchlistMovies) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie}`)
    const data = await res.json()
    renderList.push(data)
}

console.log(watchlistMovies)

if (renderList.length > 0) {
    renderMovies(renderList, movieList, "minus")
}


function removeMovie(imdbID) {
    let updatedList = watchlistMovies.filter(id => id !== imdbID)
    console.log(updatedList)
    localStorage.setItem('watchlist', JSON.stringify(updatedList))
    location.reload()
}

document.addEventListener('click', (e) => {
    const target = e.target.closest("[data-id]")
    if (target) {
        const movie = target.dataset.id
        
        if (movie) {
            target.disabled = true
            removeMovie(movie)
        }
    }
        
})
