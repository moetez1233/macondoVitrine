/**
 * Template Name: Arsha
 * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
 * Updated: May 13 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      if (document.querySelector(".mobile-nav-active")) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".swiper").forEach(function (swiper) {
      let config = JSON.parse(
        swiper.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiper, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  /**
   * Lunguage switcher
   */

  let langSwitcher = document.querySelector(".check-toggle");
  let currentLang = localStorage.getItem("selectedLang") || "Eng";
  let isInitLoad = true;
  let englishJsonFile;
  let frenchJsonFile;

  let blogsFile;

  window.onload = function () {
    // Fetch Data Files
    Promise.all([
      fetch("./assets/js/eng.json").then((response) => response.json()),
      fetch("./assets/js/fr.json").then((response) => response.json()),
      fetch("./assets/js/blogs.json").then((response) => response.json()),
    ])
      .then(([engData, frData, blogsData]) => {
        // Lunguage Switcher Handling
        englishJsonFile = engData;
        frenchJsonFile = frData;
        blogsFile = blogsData;
        toggleLangSwitcher();
        isInitLoad = false;
        // Blogs Handling
        // populateBlogsCards(blogsFile);
      })
      .catch((error) => console.error("Error:", error));
  };

  function camelToHyphen(camelStr) {
    return camelStr.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }

  function toggleLangSwitcher() {
    let engElement = document.getElementById("language-eng");
    let frElement = document.getElementById("language-fr");
    let frenchJsonFileKeys = Object.keys(frenchJsonFile);
    let frenchIdsKeys = [];
    for (let i = 0; i < frenchJsonFileKeys.length; i++) {
      let key = frenchJsonFileKeys[i];
      frenchIdsKeys.push({ id: camelToHyphen(key), key });
    }

    let englishJsonFileKeys = Object.keys(englishJsonFile);
    let englishIdsKeys = [];
    for (let i = 0; i < englishJsonFileKeys.length; i++) {
      let key = englishJsonFileKeys[i];
      englishIdsKeys.push({ id: camelToHyphen(key), key });
    }

    if (
      (currentLang === "Eng" && isInitLoad === false) ||
      (currentLang === "Fr" && isInitLoad === true)
    ) {
      currentLang = "Fr";

      for (let obj of frenchIdsKeys) {
        let elements = document.querySelectorAll(`#${obj.id}`);
        if (elements) {
          for (let element of elements) {
            element.innerHTML = frenchJsonFile[obj.key];
          }
        }
      }

      if (isInitLoad) {
        // add toggle classes
        engElement.classList.add("off");
        engElement.classList.remove("on");
        frElement.classList.add("on");
        frElement.classList.remove("off");
      }
    } else if (
      (currentLang === "Fr" && isInitLoad === false) ||
      (currentLang === "Eng" && isInitLoad === true)
    ) {
      currentLang = "Eng";

      for (let obj of englishIdsKeys) {
        let elements = document.querySelectorAll(`#${obj.id}`);
        if (elements) {
          for (let element of elements) {
            element.innerHTML = englishJsonFile[obj.key];
          }
        }
      }

      if (isInitLoad) {
        // add toggle classes
        engElement.classList.add("on");
        engElement.classList.remove("off");
        frElement.classList.add("off");
        frElement.classList.remove("on");
      }
    }

    // Save selected language to localStorage
    localStorage.setItem("selectedLang", currentLang);
    // Blogs Actions
    // populateBlogsCards(blogsFile);
  }

  langSwitcher.addEventListener("click", toggleLangSwitcher);
})();

/**
 * Blogs
 */

let blogsContainer = document.querySelector("#blogs");

function populateBlogsCards(blogsFile) {
  if (blogsContainer) {
    try {
      // Iterate over each blog object and create cards
      blogsContainer.innerHTML = "";
      blogsFile.forEach((blog) => {
        let currentLang = localStorage.getItem("selectedLang") || "Eng";
        // Create card elements
        const card = document.createElement("div");
        card.className = "card";

        const cardImg = document.createElement("img");
        cardImg.className = "card_img";
        cardImg.src = blog.image;
        cardImg.alt = "Avatar";
        cardImg.style.width = "100%";

        const containerDiv = document.createElement("div");
        containerDiv.className = "card_container";

        const cardTitle = document.createElement("h4");
        cardTitle.innerHTML = `<b>${currentLang === "Eng" ? blog.title_eng : blog.title_fr}</b>`;

        const cardDescription = document.createElement("p");
        cardDescription.textContent = currentLang === "Eng" ? blog.description_eng : blog.description_fr;

        const cardButton = document.createElement("div");
        cardButton.className = "d-flex";
        const blogLink = currentLang === "Eng" ? blog.link_eng : blog.link_fr;
        cardButton.innerHTML = ` <a href="${blogLink}" class="card_btn">${currentLang === "Eng" ?"Continue Reading" : "Continuer la lecture"}</a>`;

        // Append elements to the card
        containerDiv.appendChild(cardTitle);
        containerDiv.appendChild(cardDescription);
        card.appendChild(cardImg);
        card.appendChild(containerDiv);
        card.appendChild(cardButton);

        // Append card to the container
        blogsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  }
}

// const blogNavHeader = document.querySelector("#nav-blogs");
// blogNavHeader.addEventListener("click", blogNavHeadearHandler);
// function blogNavHeadearHandler() {
//   if (blogNavHeader) {
//     let currentLang = localStorage.getItem("selectedLang") || "Eng";
//     if (currentLang === "Eng") {
//       window.location.href = "/blogs_eng.html";
//     }
//     else {
//       window.location.href = "/blogs_fr.html";
//     }
//   }
// }


