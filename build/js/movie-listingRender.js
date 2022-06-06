import { getUrlParams } from "./utils.js";

export function renderMovies(userInputString, services) {
  // Getting API data with "returnMovies"
  const moviesResponse = services.returnMovies(
    services.moviesSearch(userInputString)
  );

  // console.log(moviesResponse); //When printing moviesResponse I got a promise.

  // Handling the promise. Extracting data, and creating div elements for each movie
  moviesResponse
    .then((moviesData) => {
      const moviesList = moviesData;
      const movies = moviesList.Search;

      if (moviesList.Error == "Too many results.") {
        document.querySelector(".movie-list-container").innerHTML = `
                    <div class="many-results"><h1>Oops!!</h1>
                    <p>Something went wrong</p>
                    <p>${moviesList.Error}</p>
                    <p> Try seaching with more specific words.</p></div>
                    `;
      } else if (moviesList.Error == "Movie not found!") {
        document.querySelector(".movie-list-container").innerHTML = `
                    <div class="not-found"><h1>Oops!!</h1>
                    <p>Something went wrong</p>
                    <p>${moviesList.Error}</p>
                    <p>Please try again</p></div>
                    `;
      }

      // Looping through movies to render them on html
      for (const movie of movies) {
        //Creating div containers for each movie
        const movieInfo = document.createElement("div");
        const movieChild1 = document.createElement("div");
        const movieChild2 = document.createElement("div");

        let movieImg = movie.Poster;

        if (movieImg == "N/A") {
          movieImg = `https://via.placeholder.com/300x450/000000/FFFFFF/?text=${movie.Title}`;
        }

        movieChild1.innerHTML = `
                <img src="${movieImg}" alt="${movie.Title}">
                `;
        movieChild2.innerHTML = `
                <a href="../movie_Details/?movie=${movie.imdbID}">
                    <h1>${movie.Title}</h1>
                </a>

                <p>Year: ${movie.Year}</p>
                `;
        movieInfo.classList.add("movie-short-info");
        movieChild1.classList.add("movieChild1");
        movieChild2.classList.add("movieChild2");
        movieInfo.appendChild(movieChild1);
        movieInfo.appendChild(movieChild2);
        document.querySelector(".movie-list-container").appendChild(movieInfo);
      }

      // Down here I'll handle pages
      const numOfResults = +`${moviesList.totalResults}`;

      if (numOfResults > 10) {
        const currentPage = +getUrlParams("page");
        const remainder = numOfResults % 10;
        let numOfPages = numOfResults / 10;

        // Getting actual number of pages if we have movies left (10 movies per page)
        if (remainder > 0) {
          numOfPages = Math.floor(numOfPages + 1);
        }

        let pagesDiv = document.createElement("div");
        let previousButton = document.createElement("button");
        let previousPage = currentPage - 1;
        let nextButton = document.createElement("button");
        let nextPage = currentPage + 1;
        let newUserInput = userInputString.substring(
          0,
          userInputString.indexOf("page=") + "page".length + 1
        );

        //Previous button content
        previousButton.innerHTML = "Previous";
        previousButton.addEventListener("click", (e) => {
          e.preventDefault();
          location.href = `../movie-listing/?searching=${newUserInput}${previousPage}`;
        });
        //Next button content
        nextButton.innerHTML = "Next";
        nextButton.addEventListener("click", (e) => {
          e.preventDefault();
          location.href = `../movie-listing/?searching=${newUserInput}${nextPage}`;
        });

        pagesDiv.classList.add("page-selection");
        pagesDiv.innerHTML = `
                <p>Page ${getUrlParams("page")} of ${numOfPages}</p>
                `;

        // Rendering page selection based on current page
        if (currentPage == 1) {
          pagesDiv.appendChild(nextButton);
          document.querySelector(".movie-list-container").appendChild(pagesDiv);
        } else if (currentPage == numOfPages) {
          pagesDiv.appendChild(previousButton);
          document.querySelector(".movie-list-container").appendChild(pagesDiv);
        } else {
          pagesDiv.appendChild(previousButton);
          pagesDiv.appendChild(nextButton);
          document.querySelector(".movie-list-container").appendChild(pagesDiv);
        }
      }
    })
    .catch((error) => {
      throw Error(error);
    });
}

export function toMovieListing() {
  // This function will take the user to movie-listing page with search input in the URL
  const currentPage = document.URL;
  let initialPath = "";

  const userInput = document.querySelector("#user-input").value;

  if (
    currentPage.includes("movie-details") ||
    currentPage.includes("movie-listing")
  ) {
    initialPath = "../";
  }

  if (userInput.trim() == "") {
    return;
  }

  location.href = `${initialPath}movie-listing/?searching=${userInput.trim()}&page=1`;
}
