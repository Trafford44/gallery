import { loadTemplate, loadSiteSettings } from "./router.js";

async function loadGallery(slug) {
  const res = await fetch(`data/galleries/${slug}/gallery.json`);
  if (!res.ok) return null;
  return await res.json();
}

async function loadImageMeta(slug, imageSlug) {
  const res = await fetch(`data/galleries/${slug}/${imageSlug}.json`);
  return await res.json();
}

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("g");
}

async function renderGallery(gallery) {
  document.getElementById("gallery-title").textContent = gallery.title;
  document.getElementById("gallery-description").textContent = gallery.description;

  const grid = document.getElementById("image-grid");

  const images = await Promise.all(
    gallery.images.map(imgSlug => loadImageMeta(gallery.slug, imgSlug))
  );

  grid.innerHTML = images.map(img => `
    <div class="image-card" onclick="location.href='image.html?g=${gallery.slug}&i=${img.slug}'">
      <img src="${img.src}" alt="${img.name}">
    </div>
  `).join("");
}

async function init() {
  await loadTemplate("header", "templates/header.html");
  await loadSiteSettings();
  await loadTemplate("footer", "templates/footer.html");

  const slug = getSlug();
  if (!slug) {
    document.getElementById("gallery-title").textContent = "Gallery not found";
    return;
  }

  const gallery = await loadGallery(slug);
  if (!gallery) {
    document.getElementById("gallery-title").textContent = "Gallery not found";
    return;
  }

  await renderGallery(gallery);
}

init();
