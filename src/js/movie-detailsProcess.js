import { getUrlParams } from "./utils";
import ExternalServices from "./externalServices";

class DetailsProcess {
  constructor() {
    this.movieId = getUrlParams("movie");
    this.services = new ExternalServices();
  }
  async pullMovie() {
    this.movie = await this.services.returnMovies(
      this.services.moviesSearch(this.movieId, true)
    );
    this.renderMovieDetails();
  }

  renderMovieDetails() {
    //set document title
    document.title += ` . ${this.movie.Title}`;
    //set document description

    document.getElementsByTagName("meta")[
      "description"
    ].content = `Movies details page for ${this.movie.Title}`;
    if (this.movie.Poster === "N/A") {
      document.querySelector(
        ".details-page-image"
      ).src = `https://via.placeholder.com/300x450/000000/FFFFFF/?text=${this.movie.Title}`;
    } else {
      document.querySelector(".details-page-image").src = this.movie.Poster;
    }
    document.querySelector(".details-page-image").alt = this.movie.Title;
    document.querySelector(".details-page-title").innerHTML = this.movie.Title;

    document.querySelector(".details-page-year").innerHTML =
      this.movie.Year + " .";
    document.querySelector(".details-page-rating").innerHTML =
      this.movie.Rated + " .";
    document.querySelector(".details-page-genre").innerHTML = this.movie.Genre;
    document.querySelector(
      ".movie-details-description"
    ).innerHTML = this.movie.Plot;
    if (this.movie.Ratings.length === 1) {
      document.querySelector(
        ".details-page-imdb"
      ).innerHTML = this.movie.Ratings[0].Value;
      document.querySelector(".details-page-tomatoes").innerHTML = "N/A";
      document.querySelector(".details-page-metacritic").innerHTML = "N/A";
    } else if (this.movie.Ratings.length === 2) {
      document.querySelector(
        ".details-page-imdb"
      ).innerHTML = this.movie.Ratings[0].Value;
      document.querySelector(
        ".details-page-tomatoes"
      ).innerHTML = this.movie.Ratings[1].Value;
      document.querySelector(".details-page-metacritic").innerHTML = "N/A";
    } else if (this.movie.Ratings.length === 3) {
      document.querySelector(
        ".details-page-imdb"
      ).innerHTML = this.movie.Ratings[0].Value;
      document.querySelector(
        ".details-page-tomatoes"
      ).innerHTML = this.movie.Ratings[1].Value;
      document.querySelector(
        ".details-page-metacritic"
      ).innerHTML = this.movie.Ratings[2].Value;
    } else {
      document.querySelector(".details-page-imdb").innerHTML = "N/A";
      document.querySelector(".details-page-tomatoes").innerHTML = "N/A";
      document.querySelector(".details-page-metacritic").innerHTML = "N/A";
    }
    document.querySelector(
      ".details-page-released"
    ).innerHTML = this.movie.Released;
    document.querySelector(
      ".details-page-runtime"
    ).innerHTML = this.movie.Runtime;
    document.querySelector(".details-page-type").innerHTML = this.movie.Type;
    document.querySelector(
      ".details-page-actors"
    ).innerHTML = this.movie.Actors;
    document.querySelector(
      ".details-page-director"
    ).innerHTML = this.movie.Director;
    document.querySelector(
      ".details-page-writers"
    ).innerHTML = this.movie.Writer;

    //Like Button

    const likeBtn = document.querySelector(".like__btn");
    const likeIcon = document.querySelector("#icon");
    const count = document.querySelector("#count");

    //Button clicked
    let clicked = false;
    let thumbsUp = "fa-solid fa-thumbs-up";
    let thumbsDown = "fa-regular fa-thumbs-up";

    const lastlike = window.localStorage.getItem(`liked${this.movieId}`);

    if (lastlike == this.movieId) {
      likeIcon.innerHTML = `<i class = "${thumbsUp}"></i>`;
      count.textContent++;
      clicked = true;
    }

    likeBtn.addEventListener("click", () => {
      if (!clicked) {
        clicked = true;
        likeIcon.innerHTML = `<i class = "${thumbsUp}"></i>`;
        count.textContent++;
        localStorage.setItem(`liked${this.movieId}`, this.movieId);
      } else {
        clicked = false;
        likeIcon.innerHTML = `<i class = "${thumbsDown}"></i>`;
        count.textContent--;
        localStorage.removeItem(`liked${this.movieId}`, this.movieId);
      }
    });
  }
}

export default DetailsProcess;
