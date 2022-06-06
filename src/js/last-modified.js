document.querySelector(
  "#lastModified"
).textContent = `Last Modification: ${document.lastModified}`;

const d = new Date();
d.setDate(d.getDate() + 50);
document.getElementById("pop-up").innerHTML = d;
