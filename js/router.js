export async function loadTemplate(id, url) {
  const container = document.getElementById(id);
  const res = await fetch(url);
  container.innerHTML = await res.text();
}

export async function loadSiteSettings() {
  const res = await fetch("settings.json");
  const settings = await res.json();

  document.getElementById("site-title").textContent = settings.siteTitle;
  document.getElementById("footer-text").textContent = settings.copyright;

  return settings;
}

export async function loadGalleries() {
  const res = await fetch("data/galleries.json");
  const data = await res.json();
  return data.galleries;
}

export async function initPage(page) {
  await loadTemplate("header", "templates/header.html");
  const settings = await loadSiteSettings();

  await loadTemplate("footer", "templates/footer.html");

  if (page === "home") {
    const galleries = await loadGalleries();
    renderGalleryList(galleries);
  }
}
