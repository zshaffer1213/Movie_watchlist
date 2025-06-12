const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('movie-search')
const backgroundP = document.getElementById('changing-p')
const movieList = document.getElementById('movie-list')

const apiKey = "f61879e5"

searchBtn.addEventListener('click', async () => {

    if (!searchInput.value) {

        backgroundP.textContent = "No Input Recorderd"
        setTimeout(() =>{
             backgroundP.textContent = "Start exploring"
        },3000)
        return
    }
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
        const data = await res.json()

        if (data.Response === "True") {
            console.log(data.Search)
            renderMovies(data.Search)
        } else {
            backgroundP.textContent = "No results found."
        }
        
    } catch (error) {
        console.log("Error fetching movies:", error)
        backgroundP.textContent = "Oops! Somthing went wrong. Try again later!"
    }

} )


function renderMovies(arr) {
    movieList.innerHTML = arr.map( movie => {
        const {Poster, Title, Year, Type, imdbID} = movie
        return `
            <div class="movie-card">
                <img src='${Poster !== "N/A" ? Poster : '/assets/placeholder.png' }'>
                <h2>${Title}</h2>

            </div>
        `
    }).join('')
}
