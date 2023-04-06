const menuIcon = document.getElementById("menu-icon");
const menuContainer = document.querySelector(".menu-container");

menuIcon.addEventListener("click", () => {
  menuContainer.classList.toggle("hidden");
});
