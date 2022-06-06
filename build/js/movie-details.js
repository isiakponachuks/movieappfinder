import { loadHeaderFooter, changeHeaderPath } from "./utils.js";
import { toMovieListing } from "./movie-listingRender.js";
import DetailsProcess from "./movie-detailsProcess.js";
window.toMovieListing = toMovieListing;

const main = async () => {
  await loadHeaderFooter();

  const processDetails = new DetailsProcess();
  processDetails.pullMovie();

  // Change Homepage Icon and source paths
  //setTimeout(changeHeaderPath, 500);
  changeHeaderPath();
};

main();
