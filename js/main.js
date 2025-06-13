const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('movie-search')
const backgroundP = document.getElementById('changing-p')
const movieList = document.getElementById('movie-list')


const apiKey = "f61879e5"
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
            renderMovies(movieFullDetails)
            
        } else {
            backgroundP.textContent = "No results found."
        }
        
    } catch (error) {
        console.log("Error fetching movies:", error)
        backgroundP.textContent = "Oops! Somthing went wrong. Try again later!"
    }
    
} )


export function renderMovies(arr) {
    movieList.innerHTML = arr.map( movie => {
        const {Poster, Title, Genre, Plot, imdbRating, Runtime, imdbID} = movie
        return `
        <div class="movie-card">
        <img class="poster-img" src='${Poster !== "N/A" ? Poster : '/assets/placeholder.png' }' alt="movie poster of ${Title}">
        <h2 class="movie-title">${Title} <span class="movie-rating"> ${imdbRating !== "N/A" ? "⭐" + imdbRating : ''}</span></h2>
        <p class="movie-runtime">${Runtime}</p>
        <p class="movie-genre">${Genre}</p>
        <button id="to-watchlist" data-id="${imdbID}"><i class="fa-solid fa-circle-plus" style="color: #ffffff;"></i> Add to watchlist</button>
        <p class="movie-plot">${Plot}</p>
        </div>
        `
    }).join('')
}

function saveLocal() {

}


const dummyMovies = [
    {
        Title: "The Matrix",
        Year: "1999",
        Rated: "R",
        Released: "31 Mar 1999",
        Runtime: "136 min",
        Genre: "Action, Sci-Fi",
        Director: "Lana Wachowski, Lilly Wachowski",
        Plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        Poster: "/assets/placeholder.png",
        imdbID: "tt0133093",
        Type: "movie"
    },
    {
        Title: "Inception",
        Year: "2010",
        Rated: "PG-13",
        Released: "16 Jul 2010",
        Runtime: "148 min",
        Genre: "Action, Adventure, Sci-Fi",
        Director: "Christopher Nolan",
        Plot: "A thief who steals corporate secrets through dream-sharing is given the inverse task of planting an idea into a CEO's mind.",
        Poster: "/assets/placeholder.png",
        imdbID: "tt1375666",
        Type: "movie"
    },
    {
        Title: "Interstellar",
        Year: "2014",
        Rated: "PG-13",
        Released: "07 Nov 2014",
        Runtime: "169 min",
        Genre: "Adventure, Drama, Sci-Fi",
        Director: "Christopher Nolan",
        Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        Poster: "/assets/placeholder.png",
        imdbID: "tt0816692",
        Type: "movie"
    }
]



document.addEventListener('click', (e) => {
    
    if (e.target.dataset.id) {
        watchlistMovies.push(dummyMovies.find(movie => movie.imdbID === e.target.dataset.id))
        e.target.style.display = 'none'
        console.log(watchlistMovies)
    }
        
})
renderMovies(dummyMovies)