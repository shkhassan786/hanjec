const track = document.querySelector('.scroll-track');
const items = track.children;

for (let i = 0; i < items.length; i++) {
  track.appendChild(items[i].cloneNode(true));
}

element.style.background = "none";