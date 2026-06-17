// Simple owner password (front-end only; replace with real auth later)
const OWNER_PASSWORD = "totustuus123";

// Content storage key
const STORAGE_KEY = "evangelization_content_v1";

// In-memory content structure
let contentData = {
  mary: [],
  faith: [],
  jp2: [],
  testimonies: [],
  saints: []
};

// Current language
let currentLang = "en";

// UI translations
const translations = {
  en: {
    siteTitle: "Catholic Evangelization",
    siteSubtitle: "Totus Tuus – All Yours, Mary",
    heroTitle: "“Be not afraid.”",
    heroSubtitle:
      "Sharing the beauty of the Catholic faith through Mary, the Saints, and living testimonies.",
    heroCta: "Begin the journey",
    nav: {
      mary: "Mary",
      faith: "Faith",
      jp2: "St. John Paul II",
      testimonies: "Testimonies",
      saints: "Saints"
    },
    sections: {
      mary: {
        title: "Mary",
        subtitle: "Mother, intercessor, and model of discipleship."
      },
      faith: {
        title: "Faith",
        subtitle: "Teachings, reflections, and resources to deepen your faith."
      },
      jp2: {
        title: "St. John Paul II",
        subtitle: "Words, life, and legacy of a beloved saint."
      },
      testimonies: {
        title: "Testimonies",
        subtitle: "Stories of grace, conversion, and hope."
      },
      saints: {
        title: "Saints",
        subtitle: "Friends in heaven who walk with us on the journey."
      }
    },
    adminTitle: "Owner Panel – Add Content",
    loginTitle: "Owner Login",
    loginInstruction: "Enter the owner password to manage content.",
    footer:
      "“Totus Tuus” – Inspired by St. John Paul II • For the glory of God and the salvation of souls."
  },
  pl: {
    siteTitle: "Ewangelizacja Katolicka",
    siteSubtitle: "Totus Tuus – Cały Twój, Maryjo",
    heroTitle: "„Nie lękajcie się.”",
    heroSubtitle:
      "Dzielenie się pięknem wiary katolickiej przez Maryję, Świętych i świadectwa życia.",
    heroCta: "Rozpocznij drogę",
    nav: {
      mary: "Maryja",
      faith: "Wiara",
      jp2: "Św. Jan Paweł II",
      testimonies: "Świadectwa",
      saints: "Święci"
    },
    sections: {
      mary: {
        title: "Maryja",
        subtitle: "Matka, orędowniczka i wzór ucznia."
      },
      faith: {
        title: "Wiara",
        subtitle: "Nauczanie, refleksje i materiały pogłębiające wiarę."
      },
      jp2: {
        title: "Św. Jan Paweł II",
        subtitle: "Słowa, życie i dziedzictwo ukochanego świętego."
      },
      testimonies: {
        title: "Świadectwa",
        subtitle: "Historie łaski, nawrócenia i nadziei."
      },
      saints: {
        title: "Święci",
        subtitle: "Przyjaciele w niebie, którzy idą z nami w drodze."
      }
    },
    adminTitle: "Panel Właściciela – Dodaj treść",
    loginTitle: "Logowanie Właściciela",
    loginInstruction: "Wpisz hasło właściciela, aby zarządzać treścią.",
    footer:
      "„Totus Tuus” – Zainspirowane św. Janem Pawłem II • Na chwałę Boga i zbawienie dusz."
  },
  es: {
    siteTitle: "Evangelización Católica",
    siteSubtitle: "Totus Tuus – Todo tuyo, María",
    heroTitle: "«No tengáis miedo.»",
    heroSubtitle:
      "Compartiendo la belleza de la fe católica a través de María, los santos y testimonios vivos.",
    heroCta: "Comienza el camino",
    nav: {
      mary: "María",
      faith: "Fe",
      jp2: "San Juan Pablo II",
      testimonies: "Testimonios",
      saints: "Santos"
    },
    sections: {
      mary: {
        title: "María",
        subtitle: "Madre, intercesora y modelo de discipulado."
      },
      faith: {
        title: "Fe",
        subtitle: "Enseñanzas, reflexiones y recursos para profundizar en la fe."
      },
      jp2: {
        title: "San Juan Pablo II",
        subtitle: "Palabras, vida y legado de un santo amado."
      },
      testimonies: {
        title: "Testimonios",
        subtitle: "Historias de gracia, conversión y esperanza."
      },
      saints: {
        title: "Santos",
        subtitle: "Amigos en el cielo que caminan con nosotros en el camino."
      }
    },
    adminTitle: "Panel del Propietario – Añadir contenido",
    loginTitle: "Acceso del Propietario",
    loginInstruction:
      "Introduce la contraseña del propietario para gestionar el contenido.",
    footer:
      "«Totus Tuus» – Inspirado por San Juan Pablo II • Para la gloria de Dios y la salvación de las almas."
  }
};

// Load content from localStorage
function loadContent() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      contentData = { ...contentData, ...parsed };
    } catch (e) {
      console.error("Error parsing stored content", e);
    }
  }
}

// Save content to localStorage
function saveContent() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contentData));
}

// Render cards for all sections
function renderAllSections() {
  const containers = document.querySelectorAll(".cards-container");
  containers.forEach((container) => {
    const sectionKey = container.getAttribute("data-section");
    renderSection(container, sectionKey);
  });
}

// Render a single section
function renderSection(container, sectionKey) {
  container.innerHTML = "";
  const items = contentData[sectionKey] || [];
  const filtered = items.filter(
    (item) => !item.lang || item.lang === currentLang
  );

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.style.fontSize = "0.8rem";
    empty.style.color = "#8a7a6a";
    empty.textContent = {
      en: "No content yet. The owner can add something here.",
      pl: "Brak treści. Właściciel może dodać coś w tym miejscu.",
      es: "Aún no hay contenido. El propietario puede añadir algo aquí."
    }[currentLang];
    container.appendChild(empty);
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const type = document.createElement("div");
    type.className = "card-type";
    type.textContent = item.type.toUpperCase();

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = item.title;

    const body = document.createElement("div");
    body.className = "card-body";
    body.textContent = item.body || "";

    card.appendChild(type);
    card.appendChild(title);
    card.appendChild(body);

    if (item.url) {
      const link = document.createElement("a");
      link.className = "card-link";
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent =
        item.type === "video"
          ? { en: "Watch video", pl: "Obejrzyj wideo", es: "Ver video" }[
              currentLang
            ]
          : { en: "Open link", pl: "Otwórz link", es: "Abrir enlace" }[
              currentLang
            ];
      card.appendChild(link);
    }

    // Delete button (owner only)
    if (isOwnerLoggedIn()) {
      const del = document.createElement("button");
      del.textContent = {
        en: "Delete",
        pl: "Usuń",
        es: "Eliminar"
      }[currentLang];
      del.className = "delete-btn";

      del.addEventListener("click", () => {
        const index = contentData[sectionKey].indexOf(item);
        if (index !== -1) {
          contentData[sectionKey].splice(index, 1);
          saveContent();
          renderAllSections();
        }
      });

      card.appendChild(del);
    }

    container.appendChild(card);
  });
}

// Apply language to static UI
function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.getElementById("site-title").textContent = t.siteTitle;
  document.getElementById("site-subtitle").textContent = t.siteSubtitle;
  document.getElementById("hero-title").textContent = t.heroTitle;
  document.getElementById("hero-subtitle").textContent = t.heroSubtitle;
  document.getElementById("hero-cta").textContent = t.heroCta;

  document.getElementById("nav-mary").textContent = t.nav.mary;
  document.getElementById("nav-faith").textContent = t.nav.faith;
  document.getElementById("nav-jp2").textContent = t.nav.jp2;
  document.getElementById("nav-testimonies").textContent = t.nav.testimonies;
  document.getElementById("nav-saints").textContent = t.nav.saints;

  document.getElementById("section-mary-title").textContent =
    t.sections.mary.title;
  document.getElementById("section-mary-subtitle").textContent =
    t.sections.mary.subtitle;

  document.getElementById("section-faith-title").textContent =
    t.sections.faith.title;
  document.getElementById("section-faith-subtitle").textContent =
    t.sections.faith.subtitle;

  document.getElementById("section-jp2-title").textContent =
    t.sections.jp2.title;
  document.getElementById("section-jp2-subtitle").textContent =
    t.sections.jp2.subtitle;

  document.getElementById("section-testimonies-title").textContent =
    t.sections.testimonies.title;
  document.getElementById("section-testimonies-subtitle").textContent =
    t.sections.testimonies.subtitle;

  document.getElementById("section-saints-title").textContent =
    t.sections.saints.title;
  document.getElementById("section-saints-subtitle").textContent =
    t.sections.saints.subtitle;

  document.getElementById("admin-title").textContent = t.adminTitle;
  document.getElementById("login-title").textContent = t.loginTitle;
  document.getElementById("login-instruction").textContent =
    t.loginInstruction;
  document.getElementById("footer-text").textContent = t.footer;

  // Re-render content with language filter
  renderAllSections();
}

// Check if owner is logged in
function isOwnerLoggedIn() {
  return localStorage.getItem("owner_logged_in") === "true";
}

function setOwnerLoggedIn(value) {
  localStorage.setItem("owner_logged_in", value ? "true" : "false");
  updateAdminVisibility();
}

// Show/hide admin panel based on login
function updateAdminVisibility() {
  const adminPanel = document.getElementById("admin-panel");
  const loginBtn = document.getElementById("login-btn");

  if (isOwnerLoggedIn()) {
    adminPanel.classList.remove("hidden");
    loginBtn.textContent = {
      en: "Logout",
      pl: "Wyloguj",
      es: "Cerrar sesión"
    }[currentLang];
  } else {
    adminPanel.classList.add("hidden");
    loginBtn.textContent = {
      en: "Owner Login",
      pl: "Logowanie Właściciela",
      es: "Acceso del Propietario"
    }[currentLang];
  }

  // Re-render sections so delete buttons appear/disappear correctly
  renderAllSections();
}

// Initialize events
function initEvents() {
  // Language buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      document
        .querySelectorAll(".lang-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyLanguage(lang);
      updateAdminVisibility();
    });
  });

  // Login button
  const loginBtn = document.getElementById("login-btn");
  const loginModal = document.getElementById("login-modal");
  const loginConfirm = document.getElementById("login-confirm");
  const loginCancel = document.getElementById("login-cancel");
  const passwordInput = document.getElementById("owner-password");

  loginBtn.addEventListener("click", () => {
    if (isOwnerLoggedIn()) {
      // Logout
      setOwnerLoggedIn(false);
      return;
    }
    passwordInput.value = "";
    loginModal.classList.remove("hidden");
    passwordInput.focus();
  });

  loginCancel.addEventListener("click", () => {
    loginModal.classList.add("hidden");
  });

  loginConfirm.addEventListener("click", () => {
    const value = passwordInput.value.trim();
    if (value === OWNER_PASSWORD) {
      setOwnerLoggedIn(true);
      loginModal.classList.add("hidden");
    } else {
      alert("Incorrect password.");
    }
  });

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      loginConfirm.click();
    }
  });

  // Admin form
  const form = document.getElementById("content-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isOwnerLoggedIn()) {
      alert("You must be logged in as owner to add content.");
      return;
    }

    const section = document.getElementById("section-select").value;
    const type = document.getElementById("type-select").value;
    const title = document.getElementById("content-title").value.trim();
    const url = document.getElementById("content-url").value.trim();
    const body = document.getElementById("content-body").value.trim();
    const lang = document.getElementById("content-lang").value;

    if (!title) {
      alert("Please enter a title.");
      return;
    }

    const item = { type, title, url: url || null, body, lang };
    contentData[section].push(item);
    saveContent();
    renderAllSections();

    form.reset();
    document.getElementById("content-lang").value = currentLang;
  });
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  loadContent();
  applyLanguage("en");
  updateAdminVisibility();
  initEvents();
});
