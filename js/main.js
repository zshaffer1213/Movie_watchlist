import { renderMovies, apiKey, movieList } from "/js/common.js"


const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('movie-search')
const backgroundP = document.getElementById('changing-p')



let movieFullDetails = []
let watchlistMovies = []

const runSearch = async () => {
    
    if (!searchInput.value) {
        
        backgroundP.textContent = "No Input Recorded"
        setTimeout(() =>{
            backgroundP.textContent = "Start exploring"
        },3000)
        return
    }
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value.trim()}`)
        const data = await res.json()
        
        if (data.Response === "True") {
            movieFullDetails = []
            console.log(data.Search)
            for (const movie of data.Search) {
                const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                const data = await res.json()
                movieFullDetails.push(data)
            }
            console.log(movieFullDetails)
            renderMovies(movieFullDetails, movieList)
            
        } else {
            backgroundP.textContent = "No results found."
        }
        
    } catch (error) {
        console.log("Error fetching movies:", error)
        backgroundP.textContent = "Oops! Somthing went wrong. Try again later!"
    }
    
} 

searchBtn.addEventListener('click', runSearch)
searchInput.addEventListener('keypress', e => {
    if (e.key === "Enter") runSearch()
})


function saveLocal(moviesArr) {
    
    let localWatchlist = JSON.parse(localStorage.getItem('watchlist')) || []

    moviesArr.forEach(id => {
        if (!localWatchlist.includes(id)){
            localWatchlist.push(id)
    
        }
    })
    localStorage.setItem('watchlist', JSON.stringify(localWatchlist))
}

document.addEventListener('click', (e) => {
    const target = e.target.closest("[data-id]")
    if (target) {
        const movie = movieFullDetails.find(movie => movie.imdbID === e.target.dataset.id)
        
        if (movie) {
            target.textContent = 'Added to watchlist!'
            target.disabled = true
            watchlistMovies.push(movie.imdbID)
            saveLocal(watchlistMovies)
        }
    }
        
})
