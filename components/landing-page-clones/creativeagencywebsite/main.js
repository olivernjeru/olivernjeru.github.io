// We use a query selector to select something from the html DOM //
const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");

// An arrow function, i.e, => is the short form of writing function()//
toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
});
