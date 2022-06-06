import { loadHeaderFooter, changeHeaderPath } from "./utils";
import { toMovieListing } from "./movie-listingRender";
import DetailsProcess from "./movie-detailsProcess";
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
