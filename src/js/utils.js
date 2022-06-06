export function getUrlParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movie = urlParams.get(param);
  return movie;
}

function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parentElement.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  const currentPage = document.URL;
  let initialPath = "";

  if (
    currentPage.includes("movie-details") ||
    currentPage.includes("movie-listing")
  ) {
    initialPath = "../";
  }

  const header = await loadTemplate(`${initialPath}partials/header.html`);
  const footer = await loadTemplate(`${initialPath}partials/footer.html`);
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function changeHeaderPath() {
  const currentPage = document.URL;

  if (
    currentPage.includes("movie-details") ||
    currentPage.includes("movie-listing")
  ) {
    const logoLink = document.querySelector("#logo-link");
    const logoImg = document.querySelector("#logo-img");

    logoLink.setAttribute("href", "../index.html");
    logoImg.setAttribute("src", "../icons/8202294731595452646.svg");
  }
}
