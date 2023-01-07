const btn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

function navToggle() {
  // Toggles for the open class when the button is clicked //
  btn.classList.toggle("open");
  nav.classList.toggle("hidden");
  // To prevent scrolling the rest of the page while the Hamburger Menu is opne //
  document.body.classList.toggle("no-scroll");
}

btn.addEventListener("click", navToggle);
