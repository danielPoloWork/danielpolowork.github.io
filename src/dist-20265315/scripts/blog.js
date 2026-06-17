/* ============================================================
   Daniel Polo — Blog list + homepage preview
   Reads posts/index.json (the hand-maintained manifest) and renders:
     #postList    → full searchable/filterable/sortable list (blog.html)
     #blogPreview → latest 3 posts (index.html)
   Localised text is read from window.I18N; re-renders on language switch.
   No markdown parsing here (titles/excerpts come from the manifest).
   ============================================================ */
(function () {
  "use strict";

  var listEl = document.getElementById("postList");
  var previewEl = document.getElementById("blogPreview");
  if (!listEl && !previewEl) return;

  var LANGS = { ja: 1, zh: 1, en: 1 };

  function lang() {
    var l = document.documentElement.getAttribute("lang");
    if (!l) { try { l = localStorage.getItem("dp-lang"); } catch (e) {} }
    return LANGS[l] ? l : "en";
  }
  function t(key) {
    var L = window.I18N || {};
    var d = L[lang()] || L.en || {};
    return d[key] != null ? d[key] : (L.en && L.en[key] != null ? L.en[key] : key);
  }
  function pick(field) {
    // field is {en,ja,zh}; fall back to en then to any present value
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[lang()] || field.en || field[Object.keys(field)[0]] || "";
  }
  function fmtDate(iso) {
    try { return new Date(iso + "T00:00:00").toLocaleDateString(lang(), { year: "numeric", month: "short", day: "numeric" }); }
    catch (e) { return iso; }
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var posts = [];

  /* ---------- Homepage preview (latest 3) ---------- */
  function renderPreview() {
    if (!previewEl) return;
    var latest = posts.slice().sort(function (a, b) { return b.date < a.date ? -1 : 1; }).slice(0, 3);
    previewEl.innerHTML = "";
    latest.forEach(function (p) {
      var a = el("a", "bp-card");
      a.href = "post.html?slug=" + encodeURIComponent(p.slug);
      a.appendChild(el("h4", null, esc(pick(p.title))));
      a.appendChild(el("p", "bp-excerpt", esc(pick(p.excerpt))));
      a.appendChild(el("span", "pr-date", esc(fmtDate(p.date))));
      previewEl.appendChild(a);
    });
  }

  /* ---------- Full list (blog.html) ---------- */
  var state = { q: "", theme: "", sort: "newest" };

  function buildControls() {
    var bar = document.getElementById("blogControls");
    if (!bar) return;
    bar.innerHTML = "";

    var search = el("input", "blog-search");
    search.type = "search";
    search.value = state.q;
    search.placeholder = t("blog.search");
    search.addEventListener("input", function () { state.q = search.value; renderList(); });
    bar.appendChild(search);

    // theme chips (unique themes across posts)
    var themes = [];
    posts.forEach(function (p) { (p.themes || []).forEach(function (th) { if (themes.indexOf(th) < 0) themes.push(th); }); });
    if (themes.length) {
      var hg = el("div", "filter-group");
      hg.appendChild(el("span", "fg-label", esc(t("blog.filterTheme"))));
      hg.appendChild(chip(t("blog.all"), state.theme === "", function () { state.theme = ""; renderList(); }));
      themes.sort().forEach(function (th) {
        hg.appendChild(chip(th, state.theme === th, function () { state.theme = th; renderList(); }));
      });
      bar.appendChild(hg);
    }

    var sort = el("select", "blog-sort");
    sort.innerHTML = '<option value="newest">' + esc(t("blog.sortNewest")) + '</option><option value="oldest">' + esc(t("blog.sortOldest")) + "</option>";
    sort.value = state.sort;
    sort.addEventListener("change", function () { state.sort = sort.value; renderList(); });
    bar.appendChild(sort);

    controlsBuilt = true;
  }

  function chip(label, active, onClick) {
    var b = el("button", "chip" + (active ? " active" : ""), esc(label));
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  function renderList() {
    if (!listEl) return;
    buildControls();

    var q = state.q.trim().toLowerCase();
    var rows = posts.filter(function (p) {
      if (state.theme && (p.themes || []).indexOf(state.theme) < 0) return false;
      if (q) {
        var hay = (pick(p.title) + " " + pick(p.excerpt) + " " + (p.themes || []).join(" ")).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    rows.sort(function (a, b) {
      if (a.date === b.date) return 0;
      return (state.sort === "oldest" ? (a.date < b.date) : (a.date > b.date)) ? -1 : 1;
    });

    listEl.innerHTML = "";
    if (!rows.length) {
      listEl.appendChild(el("div", "blog-state", esc(t("blog.empty"))));
      return;
    }
    rows.forEach(function (p) {
      var a = el("a", "post-row");
      a.href = "post.html?slug=" + encodeURIComponent(p.slug);

      var date = el("span", "pr-date", esc(fmtDate(p.date)));

      var main = el("span", "pr-main");
      main.appendChild(el("h4", null, esc(pick(p.title)) + " <span class=\"ext\">↗</span>"));
      main.appendChild(el("div", "pr-excerpt", esc(pick(p.excerpt))));
      var meta = el("div", "pr-meta");
      (p.themes || []).forEach(function (th) { meta.appendChild(el("span", "ptheme", esc(th))); });
      main.appendChild(meta);

      // grid is "1fr auto": main on the left, date on the right (date moves on top on mobile)
      a.appendChild(main);
      a.appendChild(date);
      listEl.appendChild(a);
    });
  }

  function draw() { renderList(); renderPreview(); }

  /* ---------- Load + language switching ---------- */
  fetch("posts/index.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) { posts = (data && data.posts) || []; draw(); })
    .catch(function () {
      if (listEl) { listEl.innerHTML = ""; listEl.appendChild(el("div", "blog-state", esc(t("blog.empty")))); }
    });

  document.querySelectorAll("#lang button").forEach(function (b) {
    b.addEventListener("click", function () { setTimeout(draw, 0); });
  });
})();
