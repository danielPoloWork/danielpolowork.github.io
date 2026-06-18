/* ============================================================
   Daniel Polo — Single blog post
   ?slug=<slug>  →  reads meta from posts/<slug>/meta.json and the body from
   posts/<slug>/<lang>.md, renders markdown (marked) sanitised (DOMPurify),
   and re-renders the body + meta when the language changes.
   ============================================================ */
(function () {
  "use strict";

  var titleEl = document.getElementById("articleTitle");
  var dateEl = document.getElementById("articleDate");
  var themesEl = document.getElementById("articleThemes");
  var bodyEl = document.getElementById("articleBody");
  var headEl = document.getElementById("articleHead");
  if (!bodyEl) return;

  var LANGS = { ja: 1, zh: 1, en: 1 };
  function lang() {
    var l = document.documentElement.getAttribute("lang");
    if (!l) { try { l = localStorage.getItem("dp-lang"); } catch (e) {} }
    return LANGS[l] ? l : "en";
  }
  function t(key) {
    var L = window.I18N || {}, d = L[lang()] || L.en || {};
    return d[key] != null ? d[key] : (L.en && L.en[key] != null ? L.en[key] : key);
  }
  function pick(f) {
    if (f == null) return "";
    if (typeof f === "string") return f;
    return f[lang()] || f.en || f[Object.keys(f)[0]] || "";
  }
  function fmtDate(iso) {
    try { return new Date(iso + "T00:00:00").toLocaleDateString(lang(), { year: "numeric", month: "long", day: "numeric" }); }
    catch (e) { return iso; }
  }
  function param(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }
  function showError() {
    if (headEl) headEl.style.display = "none";
    bodyEl.innerHTML = '<div class="blog-state">' + t("blog.notFound") +
      ' <a href="blog.html">' + t("blog.back") + "</a></div>";
  }

  var slug = param("slug");
  var meta = null;

  function renderMeta() {
    if (!meta) return;
    var title = pick(meta.title);
    if (titleEl) titleEl.textContent = title;
    if (title) document.title = title + " — Daniel Polo";
    if (dateEl) dateEl.textContent = fmtDate(meta.date);
    if (themesEl) {
      themesEl.innerHTML = "";
      (meta.themes || []).forEach(function (th) {
        var s = document.createElement("span");
        s.className = "ptheme";
        s.textContent = th;
        themesEl.appendChild(s);
      });
    }
  }

  function renderBody() {
    if (!meta) return;
    bodyEl.innerHTML = '<div class="blog-state">…</div>';
    var l = lang();
    fetchBody(l)
      .catch(function () { return l === "en" ? Promise.reject() : fetchBody("en"); })
      .then(function (md) {
        var html = window.marked ? window.marked.parse(md) : md;
        if (window.DOMPurify) html = window.DOMPurify.sanitize(html);
        bodyEl.innerHTML = html;
      })
      .catch(function () { bodyEl.innerHTML = '<div class="blog-state">' + t("blog.empty") + "</div>"; });
  }
  function fetchBody(l) {
    return fetch("posts/" + slug + "/" + l + ".md", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); });
  }

  function renderAll() { renderMeta(); renderBody(); }

  /* ---------- Comments (Giscus) ---------- */
  var GISCUS_LANG = { en: "en", ja: "ja", zh: "zh-CN" };
  function giscusLang() { return GISCUS_LANG[lang()] || "en"; }
  function giscusTheme() { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function postToGiscus(message) {
    var f = document.querySelector("iframe.giscus-frame");
    if (f && f.contentWindow) f.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }
  function mountGiscus() {
    var host = document.getElementById("giscus");
    if (!host) return;
    var s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    var attrs = {
      "data-repo": "danielPoloWork/danielpolowork.github.io",
      "data-repo-id": "R_kgDOISEilQ",
      "data-category": "Blog",
      "data-category-id": "DIC_kwDOISEilc4C_Xpm",
      "data-mapping": "specific",
      "data-term": slug,            // one discussion thread per post (language-independent)
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": giscusTheme(),
      "data-lang": giscusLang(),
      "data-loading": "lazy"
    };
    Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    s.crossOrigin = "anonymous";
    s.async = true;
    host.appendChild(s);
    // keep Giscus theme + language in sync with the site's toggle / language switch
    new MutationObserver(function () {
      postToGiscus({ setConfig: { theme: giscusTheme(), lang: giscusLang() } });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "lang"] });
  }

  if (window.marked) window.marked.setOptions({ gfm: true, breaks: false });

  if (!slug) { showError(); return; }

  fetch("posts/" + slug + "/meta.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      meta = data || null;
      if (!meta) { showError(); return; }
      renderAll();
      mountGiscus();
    })
    .catch(showError);

  document.querySelectorAll("#lang button").forEach(function (b) {
    b.addEventListener("click", function () { setTimeout(renderAll, 0); });
  });
})();
