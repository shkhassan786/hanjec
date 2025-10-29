function toggleMenu() {
  const menu = document.getElementById("menu-options");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById("menu-options");
  const menuButton = document.querySelector('.panel-all');
  
  if (menu && menuButton && !menu.contains(e.target) && !menuButton.contains(e.target)) {
    menu.style.display = "none";
  }
});

// Smooth scroll for "Back to top" link
document.addEventListener('DOMContentLoaded', () => {
  const backToTopLink = document.querySelector('.footer-top a');
  if (backToTopLink) {
    backToTopLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
