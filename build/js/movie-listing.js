// This file is to display a list of movies based on user input
import ExternalServices from "./externalServices.js";
import { toMovieListing, renderMovies } from "./movie-listingRender.js";
import { getUrlParams, loadHeaderFooter, changeHeaderPath } from "./utils.js";

//Exposing search function to html
window.toMovieListing = toMovieListing;
const services = new ExternalServices();

if (getUrlParams("searching") !== null) {
  const userSearch = getUrlParams("searching");
  const userPage = getUrlParams("page");

  renderMovies(`${userSearch}&page=${userPage}`, services);
}

const main = async () => {
  await loadHeaderFooter();

  // Redering movies based on URL

  // Change Homepage Icon and source paths
  changeHeaderPath();
  //setTimeout(changeHeaderPath, 250);
};

main();
