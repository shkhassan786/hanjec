function toggleMenu() {
  const menu = document.getElementById("menu-options");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

const menuIcon = document.getElementById('menu-icon');
const menuOptions = document.querySelector('.menu-options');

menuOptions.addEventListener('click', () => {
  menuOptions.style.display = (menuOptions.style.display === 'block') ? 'none' : 'block';
});
