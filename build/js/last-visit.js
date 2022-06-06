const factor = 1000 * 60 * 60 * 24;
let id = document.getElementById("lastvisit");
const lastvistit = Number(window.localStorage.getItem("lastvisit"));

let daysbetween = Date.now() - lastvistit;

let numberOfDays = Math.round(daysbetween / factor);

if (lastvistit !== 0) {
  id.textContent = `Has been ${numberOfDays} days since the last visit, Welcome Back!`;
} else {
  id.textContent = "Welcome!!! This is your first visit";
}
localStorage.setItem("lastvisit", Date.now());
