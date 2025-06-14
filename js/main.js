import { renderMovies, apiKey, movieList } from "/js/common.js"


const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('movie-search')
const backgroundP = document.getElementById('changing-p')



let movieFullDetails = []
let watchlistMovies = []

searchBtn.addEventListener('click', async () => {
    
    if (!searchInput.value) {
        
        backgroundP.textContent = "No Input Recorderd"
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
    
} )




function saveLocal(moviesArr) {
    
    let localWatchlist = JSON.parse(localStorage.getItem('watchlist')) || []

    moviesArr.forEach(id => {
        if (!localWatchlist.includes(id)){
            localWatchlist.push(id)
    
        }
    })
    localStorage.setItem('watchlist', JSON.stringify(localWatchlist))
}


// const dummyMovies = [
//     {
//         Title: "The Matrix",
//         Year: "1999",
//         Rated: "R",
//         Released: "31 Mar 1999",
//         Runtime: "136 min",
//         Genre: "Action, Sci-Fi",
//         Director: "Lana Wachowski, Lilly Wachowski",
//         Plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
//         Poster: "/assets/placeholder.png",
//         imdbID: "tt0133093",
//         Type: "movie"
//     },
//     {
//         Title: "Inception",
//         Year: "2010",
//         Rated: "PG-13",
//         Released: "16 Jul 2010",
//         Runtime: "148 min",
//         Genre: "Action, Adventure, Sci-Fi",
//         Director: "Christopher Nolan",
//         Plot: "A thief who steals corporate secrets through dream-sharing is given the inverse task of planting an idea into a CEO's mind.",
//         Poster: "/assets/placeholder.png",
//         imdbID: "tt1375666",
//         Type: "movie"
//     },
//     {
//         Title: "Interstellar",
//         Year: "2014",
//         Rated: "PG-13",
//         Released: "07 Nov 2014",
//         Runtime: "169 min",
//         Genre: "Adventure, Drama, Sci-Fi",
//         Director: "Christopher Nolan",
//         Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
//         Poster: "/assets/placeholder.png",
//         imdbID: "tt0816692",
//         Type: "movie"
//     }
// ]



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
renderMovies(movieFullDetails, movieList)