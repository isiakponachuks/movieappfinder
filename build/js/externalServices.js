function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "servicesError", message: res.json() };
  }
}

class ExternalServices {
  constructor() {
    this.api = "https://www.omdbapi.com/?&apikey=466aa9b6";
  }

  async returnMovies(callback) {
    const response = await fetch(`${this.api}&${callback}`);
    const data = await convertToJson(response);
    return data;
  }

  moviesSearch(name = "home", details = false) {
    //function to check name string and retrun it as a callback to the
    // decide the name and year

    const list = [
      "batman",
      "superman",
      "Venom",
      2022,
      "matrix",
      2019,
      "men in black",
      "Spiderman",
      "Star Wars",
      "Thor",
      "Mr, Nobody",
      2021,
      "Jurassic Park",
      "Top Gun",
      "Avatar",
      "Avengers",
      "Joker",
      "Justice League",
      2000,
      2018,
      "Interstellar",
      "Inception",
      "Chernobyl",
      "Antman",
      "hunger games",
      "godzilla",
      "kong",
      "doctor strange",
      "wonderwoman",
      "Harry potter",
      "lord of the rings",
      "Fast and furious",
      "scream",
      "Zombieland",
      "Saw",
    ];

    const index = Math.floor(Math.random() * list.length);
    // returns the movies on the homepage
    if (name == "home") {
      return `s=${list[index]}`;
    }
    // returns the movie for the details page
    else if (details) {
      return `i=${name}&plot=full`;
    }
    // returns the movie for the search page
    else {
      return `s=${name}`;
    }
  }
}

export default ExternalServices;
