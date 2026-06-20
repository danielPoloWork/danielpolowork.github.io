/* ============================================================
   Daniel Polo — Single blog post
   ?slug=<slug>  →  looks the post up in posts/index.json (which carries its meta
   and its on-disk `path`, e.g. "2026/<slug>"), then reads the body from
   posts/<path>/<lang>.md. The year folder is internal: the URL and the Giscus
   thread key stay the bare slug. Renders markdown (marked) sanitised (DOMPurify),
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
  var base = null;   // "posts/<path>/" resolved from the index (path includes the year folder)

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
    renderShare(title);
  }

  // Build the X / LinkedIn share links from the post URL + localised title.
  function renderShare(title) {
    var url = location.href.split("#")[0];
    var x = document.getElementById("shareX");
    var li = document.getElementById("shareLi");
    if (x) x.href = "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(title) + "&url=" + encodeURIComponent(url);
    if (li) li.href = "https://www.linkedin.com/sharing/share-offsite/?url=" +
      encodeURIComponent(url);
  }

  function renderBody() {
    if (!meta) return;
    bodyEl.innerHTML = '<div class="blog-state">…</div>';
    var l = lang();
    fetchBody(l)
      .catch(function () { return l === "en" ? Promise.reject() : fetchBody("en"); })
      .then(function (md) {
        md = stripLeadingH1(md);
        var html = window.marked ? window.marked.parse(md) : md;
        if (window.DOMPurify) html = window.DOMPurify.sanitize(html);
        bodyEl.innerHTML = html;
      })
      .catch(function () { bodyEl.innerHTML = '<div class="blog-state">' + t("blog.empty") + "</div>"; });
  }
  // The article title is owned by the page header (#articleTitle, from meta.json),
  // so drop a leading H1 in the markdown body to avoid showing the title twice.
  function stripLeadingH1(md) {
    return String(md).replace(/^﻿?\s*#\s+.*(?:\r?\n)+/, "");
  }
  function fetchBody(l) {
    return fetch(base + l + ".md", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); });
  }

  function renderAll() { renderMeta(); renderBody(); }

  /* ---------- Comments (Giscus) ---------- */
  var GISCUS_LANG = { en: "en", ja: "ja", zh: "zh-CN" };
  function giscusLang() { return GISCUS_LANG[lang()] || "en"; }
  function giscusTheme() { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  // Resolve the absolute URL of our custom Giscus theme (sits next to app.css,
  // so it tracks the version-stamped dist folder automatically). Giscus needs a
  // full https URL; on localhost/file it can't be reached from the https iframe,
  // so fall back to the built-in preset there.
  function giscusThemeUrl() {
    var name = giscusTheme();
    var h = location.hostname;
    if (location.protocol !== "https:" || h === "localhost" || h === "127.0.0.1" || h === "") return name;
    var link = document.querySelector('link[href*="/styles/app.css"]');
    if (!link) return name;
    try { return new URL("giscus-" + name + ".css", link.href).href; } catch (e) { return name; }
  }
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
      "data-reactions-enabled": "0",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": giscusThemeUrl(),
      "data-lang": giscusLang(),
      "data-loading": "lazy"
    };
    Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    s.crossOrigin = "anonymous";
    s.async = true;
    host.appendChild(s);
    // keep Giscus theme + language in sync with the site's toggle / language switch
    new MutationObserver(function () {
      postToGiscus({ setConfig: { theme: giscusThemeUrl(), lang: giscusLang() } });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "lang"] });
  }

  if (window.marked) window.marked.setOptions({ gfm: true, breaks: false });

  if (!slug) { showError(); return; }

  // Resolve the post via the generated index: the entry carries the meta (title/date/
  // themes/excerpt) AND its on-disk `path` (e.g. "2026/<slug>"). The year folder thus
  // stays internal — the URL and the Giscus `data-term` remain the bare slug.
  fetch("posts/index.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var list = (data && data.posts) || [];
      var entry = null;
      for (var i = 0; i < list.length; i++) { if (list[i].slug === slug) { entry = list[i]; break; } }
      if (!entry) { showError(); return; }
      meta = entry;
      base = "posts/" + (entry.path || entry.slug) + "/";  // fallback to bare slug if path absent
      renderAll();
      mountGiscus();
    })
    .catch(showError);

  document.querySelectorAll("#lang button").forEach(function (b) {
    b.addEventListener("click", function () { setTimeout(renderAll, 0); });
  });
})();
