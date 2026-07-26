(function () {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }

  function renderDayCounter() {
    const start = new Date(RELATIONSHIP_START + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.floor((today - start) / 86400000) + 1;
    document.getElementById("dayCount").textContent = Math.max(days, 0);
    document.getElementById("sinceDate").textContent = formatDate(RELATIONSHIP_START);
    document.getElementById("sinceDate").setAttribute("datetime", RELATIONSHIP_START);
  }

  function photoNode(photoFile, alt) {
    const wrap = document.createElement("div");
    wrap.className = "timeline-photo";
    const img = document.createElement("img");
    img.alt = alt;
    img.loading = "lazy";
    img.dataset.src = `assets/photos/${photoFile}`;
    wrap.appendChild(img);
    return wrap;
  }

  function photosNode(photoFiles, alt) {
    const scrollable = photoFiles.length > 4;
    const group = document.createElement("div");
    group.className = "timeline-photos" + (scrollable ? " is-scrollable" : "");
    photoFiles.forEach((file) => group.appendChild(photoNode(file, alt)));

    if (!scrollable) return group;

    const wrap = document.createElement("div");
    wrap.className = "timeline-photos-wrap";
    wrap.appendChild(group);
    wrap.appendChild(photosNavButton("prev", "上一张", group));
    wrap.appendChild(photosNavButton("next", "下一张", group));
    return wrap;
  }

  function photosNavButton(dir, label, group) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `photos-nav photos-nav-${dir}`;
    btn.setAttribute("aria-label", label);
    btn.textContent = dir === "prev" ? "‹" : "›";

    const step = () => {
      const gap = parseFloat(getComputedStyle(group).columnGap) || 0;
      const first = group.querySelector(".timeline-photo");
      return (first ? first.getBoundingClientRect().width : group.clientWidth) + gap;
    };

    btn.addEventListener("click", () => {
      group.scrollBy({ left: dir === "prev" ? -step() : step(), behavior: "smooth" });
    });

    const updateState = () => {
      const max = group.scrollWidth - group.clientWidth - 1;
      btn.disabled = dir === "prev" ? group.scrollLeft <= 0 : group.scrollLeft >= max;
    };
    group.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    requestAnimationFrame(updateState);

    return btn;
  }

  function renderTimeline() {
    const list = document.getElementById("timelineList");
    TIMELINE.forEach((item, i) => {
      const row = document.createElement("article");
      row.className = "timeline-item" + (item.highlight ? " is-highlight" : "");
      row.style.setProperty("--i", i);

      const dot = document.createElement("span");
      dot.className = "timeline-dot";
      row.appendChild(dot);

      const card = document.createElement("div");
      card.className = "timeline-card";

      const date = document.createElement("time");
      date.className = "timeline-date";
      date.textContent = formatDate(item.date);
      date.setAttribute("datetime", item.date);

      const title = document.createElement("h3");
      title.className = "timeline-title";
      title.textContent = item.title;

      const desc = document.createElement("p");
      desc.className = "timeline-desc";
      desc.textContent = item.desc;

      card.appendChild(date);
      card.appendChild(title);
      card.appendChild(desc);
      if (item.photos) {
        card.appendChild(photosNode(item.photos, item.title));
      } else if (item.photo) {
        card.appendChild(photoNode(item.photo, item.title));
      }

      row.appendChild(card);
      list.appendChild(row);
    });
  }

  // 照片加载失败（还没放真实照片）时，用一个温柔的占位图代替，而不是显示破图标。
  function setupPhotoFallback() {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      img.addEventListener(
        "error",
        () => {
          img.removeAttribute("src");
          img.closest("[class*='photo']").classList.add("is-placeholder");
        },
        { once: true }
      );
      img.src = img.dataset.src;
    });
  }

  function setupScrollReveal() {
    const items = document.querySelectorAll(".timeline-item, .profile-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => io.observe(el));
  }

  function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    document.addEventListener("click", (e) => {
      const img = e.target.closest(".timeline-photo img, .profile-photo img");
      if (img && img.getAttribute("src")) {
        lightboxImg.src = img.src;
        lightbox.classList.add("is-open");
      } else if (e.target === lightbox) {
        lightbox.classList.remove("is-open");
      }
    });
    lightbox.addEventListener("click", () => lightbox.classList.remove("is-open"));
  }

  function setupStarfield() {
    const field = document.getElementById("starfield");
    if (!field) return;

    const count = 160;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      const size = (Math.random() * 3.6 + 2).toFixed(2);
      star.style.setProperty("--x", `${(Math.random() * 100).toFixed(2)}%`);
      star.style.setProperty("--y", `${(Math.random() * 100).toFixed(2)}%`);
      star.style.setProperty("--size", `${size}px`);
      star.style.setProperty("--dur", `${(Math.random() * 3 + 3).toFixed(2)}s`);
      star.style.setProperty("--delay", `${(Math.random() * 5).toFixed(2)}s`);
      frag.appendChild(star);
    }
    field.appendChild(frag);
  }

  function setupLoader() {
    const loader = document.getElementById("loader");
    const hero = document.getElementById("hero");
    if (!loader || !hero) return;

    document.body.classList.add("is-loading");
    const minDelay = 6000;
    const start = Date.now();

    const reveal = () => {
      const wait = Math.max(minDelay - (Date.now() - start), 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.classList.remove("is-loading");
        hero.classList.add("is-revealed");
        loader.classList.add("is-hidden");
        loader.addEventListener("transitionend", () => loader.remove(), { once: true });
      }, wait);
    };

    if (document.readyState === "complete") {
      reveal();
    } else {
      window.addEventListener("load", reveal, { once: true });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupStarfield();
    renderDayCounter();
    renderTimeline();
    setupPhotoFallback();
    setupScrollReveal();
    setupLightbox();
    setupLoader();
  });
})();
