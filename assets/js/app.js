// ── Markdown helpers ───────────────────────────────────────────────────────
// md()       — block-level: paragraphs, headings, lists, etc.
// mdInline() — inline only: bold, italic, links — no wrapping <p>
function md(text) {
  if (!text || typeof marked === 'undefined') return text || '';
  return marked.parse(text);
}
function mdInline(text) {
  if (!text || typeof marked === 'undefined') return text || '';
  return marked.parseInline(text);
}

// ── Theme ──────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme');
  const sys   = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || sys);
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = t === 'dark' ? '☀' : '☾';
}

function toggleTheme() {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

// ── Navigation ─────────────────────────────────────────────────────────────
const PAGES = [
  { href: 'index.html',        label: 'Home' },
  { href: 'publications.html', label: 'Publications' },
  { href: 'blog.html',         label: 'Blog' },
  { href: CONFIG.resumePDF || 'files/resume.pdf', label: 'CV', blank: true },
];

function buildNav(active) {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="container">
      <div class="nav-inner">
        <a class="nav-brand" href="index.html">${CONFIG.name}</a>
        <div class="nav-links">
          ${PAGES.map(p =>
            `<a href="${p.href}"${p.blank ? ' target="_blank" rel="noopener"' : ''}${p.href === active ? ' class="active"' : ''}>${p.label}</a>`
          ).join('')}
          <button class="theme-btn" id="themeBtn" onclick="toggleTheme()" title="Toggle theme">☾</button>
        </div>
      </div>
    </div>`;
  applyTheme(localStorage.getItem('theme') || 'light');
}

// ── SVG icons ──────────────────────────────────────────────────────────────
const ICONS = {
  email:    `<svg viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>`,
  github:   `<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.18c-3.34.73-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.8 1.3 3.48.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.28-1.23 3.28-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  scholar:  `<svg viewBox="0 0 24 24"><path d="M12 3L1 9l4.5 2.45V16.5C5.5 19 8.5 21 12 21s6.5-2 6.5-4.5v-5.05L22 9 12 3zm4.5 12.6c0 1.38-2 2.9-4.5 2.9s-4.5-1.52-4.5-2.9v-3.98l4.5 2.45 4.5-2.45v3.98z"/></svg>`,
  twitter:  `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  orcid:    `<svg viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.909 3.872-3.722 0-2.016-1.116-3.722-3.828-3.722h-2.341z"/></svg>`,
  homepage: `<svg viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>`,
};

const LINK_ICONS = {
  paper: '📄', arxiv: '📋', code: '💻',
  demo: '🎬', video: '▶', slides: '📊',
  poster: '🖼', website: '🌐', project: '🔗',
};

// ── Home page ──────────────────────────────────────────────────────────────
function buildHome() {
  buildNav('index.html');
  document.title = CONFIG.name;
  renderProfile();
  renderAboutMe();
  renderNews();
  renderVisitorSection();
  buildFooter();
}

function renderProfile() {
  const el = document.getElementById('profile');
  if (!el) return;

  const socials = Object.entries(CONFIG.social)
    .filter(([, v]) => v)
    .map(([k, v]) => {
      const labels = {
        email: 'Email', github: 'GitHub', scholar: 'Scholar',
        twitter: 'Twitter', linkedin: 'LinkedIn', orcid: 'ORCID', homepage: 'Website',
      };
      return `<a class="social-link" href="${v}" target="_blank" rel="noopener">
        ${ICONS[k] || ''}${labels[k] || k}</a>`;
    }).join('');

  el.innerHTML = `
    <img class="avatar" src="${CONFIG.avatar}" alt="${CONFIG.name}"
      onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(CONFIG.name)}&size=152&background=c2410c&color=fff'">
    <h1 class="profile-name">${CONFIG.name}</h1>
    <p class="profile-title">${CONFIG.title}</p>
    <p class="profile-inst">${CONFIG.institution.replace(/\n/g, '<br>')}</p>
    <div class="social-links">${socials}</div>`;
}

function renderAboutMe() {
  const el = document.getElementById('aboutMe');
  if (!el) return;
  el.innerHTML = md(CONFIG.bio);
}

function renderNews() {
  const el = document.getElementById('newsList');
  if (!el) return;
  el.innerHTML = NEWS.map(n =>
    `<li class="news-item">
      <span class="news-date">${n.date}</span>
      <span>${mdInline(n.text)}</span>
    </li>`
  ).join('');
}

function renderVisitorSection() {
  const mapEl = document.getElementById('visitorMap');
  const luEl  = document.getElementById('lastUpdated');

  if (mapEl) {
    if (CONFIG.clustrmaps) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.id   = 'clustrmaps';
      s.src  = `//clustrmaps.com/map_v2.js?d=${CONFIG.clustrmaps}&cl=ffffff&w=a`;
      mapEl.innerHTML = '';
      mapEl.appendChild(s);
    } else {
      mapEl.innerHTML = `<p class="map-hint">
        Set <code>clustrmaps</code> in <code>data/config.js</code> to show visitor map
        — see README for registration steps.
      </p>`;
    }
  }

  if (luEl) luEl.textContent = `updated ${CONFIG.lastUpdated}`;
}

// ── Publications ───────────────────────────────────────────────────────────
function buildPublications() {
  buildNav('publications.html');
  document.title = `Publications — ${CONFIG.name}`;
  buildFooter();

  const sorted = [...PUBLICATIONS].sort((a, b) => b.year - a.year);
  const tags   = [...new Set(sorted.flatMap(p => p.tags || []))];

  const filtersEl = document.getElementById('pubFilters');
  if (filtersEl && tags.length) {
    filtersEl.innerHTML =
      `<button class="filter-btn active" onclick="filterPubs('all',this)">All</button>` +
      tags.map(t =>
        `<button class="filter-btn" onclick="filterPubs('${t}',this)">${t}</button>`
      ).join('');
  }

  renderPubs(sorted);
}

function filterPubs(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const list = tag === 'all'
    ? PUBLICATIONS
    : PUBLICATIONS.filter(p => (p.tags || []).includes(tag));
  renderPubs([...list].sort((a, b) => b.year - a.year));
}

function renderPubs(list) {
  const el = document.getElementById('pubList');
  if (!el) return;

  el.innerHTML = list.map((p, i) => {
    const eq = p.equal || [];
    const authors = p.authors.map(a => {
      const sup  = eq.includes(a) ? '<sup>†</sup>' : '';
      const name = a === p.me ? `<span class="me">${a}</span>` : a;
      return name + sup;
    }).join(', ');
    const equalNote = '';

    const links = Object.entries(p.links || {})
      .filter(([, v]) => v)
      .map(([k, v]) =>
        `<a class="pub-link" href="${v}" target="_blank" rel="noopener">${LINK_ICONS[k] || '🔗'} ${k}</a>`
      ).join('');

    const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    const thumbContent = p.thumbnail
      ? p.thumbnail.toLowerCase().endsWith('.pdf')
        ? `<span class="pdf-pending" data-pdf="${p.thumbnail}"></span>`
        : `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy">`
      : `<span class="pdf-pending" data-pdf="${p.links?.paper || p.links?.arxiv || ''}">📄</span>`;

    return `
      <div class="pub-card">
        <div class="pub-thumb" id="thumb-${i}">${thumbContent}</div>
        <div class="pub-info">
          <h3 class="pub-title">${p.title}</h3>
          <p class="pub-authors">${authors}</p>
          ${equalNote}
          <p class="pub-venue">${p.venue} &middot; ${p.year}</p>
          <div class="pub-links">${links}</div>
          ${tags ? `<div class="pub-tags">${tags}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  schedulePDFPreviews();
}

// Render PDF thumbnails after layout is complete
function schedulePDFPreviews() {
  if (typeof pdfjsLib === 'undefined') return;

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  requestAnimationFrame(() => {
    document.querySelectorAll('.pub-thumb .pdf-pending').forEach(span => {
      const url       = span.getAttribute('data-pdf');
      const container = span.closest('.pub-thumb');
      if (url && container) renderPDFThumb(url, container);
    });
  });
}

async function renderPDFThumb(url, container) {
  if (!url) return;
  try {
    const pdf  = await pdfjsLib.getDocument(url).promise;
    const page = await pdf.getPage(1);
    const vp0  = page.getViewport({ scale: 1 });
    // Fill container width at full resolution, then crop top portion
    const scale = (container.clientWidth || 200) / vp0.width;
    const vp = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width  = vp.width;
    canvas.height = vp.height;   // full page, container clips the bottom

    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    container.style.alignItems   = 'flex-start';  // pin canvas to top
    container.style.overflow     = 'hidden';
    container.innerHTML = '';
    container.appendChild(canvas);
  } catch {
    // keep emoji fallback already in DOM
  }
}

// ── Blog ───────────────────────────────────────────────────────────────────
// Deterministic gradient from post title for placeholder thumbnails
function titleGradient(title) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) & 0xffffff;
  const hue = ((h % 360) + 360) % 360;
  return `linear-gradient(135deg, hsl(${hue},55%,52%), hsl(${(hue + 45) % 360},62%,38%))`;
}

function buildBlog() {
  buildNav('blog.html');
  document.title = `Blog — ${CONFIG.name}`;
  buildFooter();

  const el = document.getElementById('blogGrid');
  if (!el) return;

  el.innerHTML = BLOG.map((post, i) => {
    const thumb = post.image
      ? `<img class="blog-thumb-img" src="${post.image}" alt="${post.title}" loading="lazy">`
      : `<div class="blog-thumb-placeholder" id="bthumb-${i}" style="background:${titleGradient(post.title)}">${post.title[0].toUpperCase()}</div>`;

    const meta = [post.date, ...(post.tags || [])].join(' · ');
    const isInternal = post.url && !post.url.startsWith('http');

    return `
      <a class="blog-card" href="${post.url}"${isInternal ? '' : ' target="_blank" rel="noopener"'}>
        ${thumb}
        <div class="blog-body">
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-meta">${meta}</p>
          ${post.summary ? `<p class="blog-summary">${mdInline(post.summary)}</p>` : ''}
        </div>
      </a>`;
  }).join('');

  // For internal posts without a manual image, auto-extract first image from markdown
  BLOG.forEach((post, i) => {
    if (post.image) return;
    const match = post.url && post.url.match(/[?&]post=([^&]+)/);
    if (!match) return;
    fetch(`files/blogs/${match[1]}`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (!text) return;
        const imgMatch = text.match(/!\[.*?\]\(([^)]+)\)/);
        if (!imgMatch) return;
        const el = document.getElementById(`bthumb-${i}`);
        if (el) el.outerHTML = `<img class="blog-thumb-img" src="${imgMatch[1]}" alt="" loading="lazy">`;
      })
      .catch(() => {});
  });
}

// ── Blog post (Markdown renderer) ──────────────────────────────────────────
function buildBlogPost() {
  buildNav('blog.html');
  buildFooter();

  const params   = new URLSearchParams(location.search);
  const filename = params.get('post');
  const el       = document.getElementById('postContent');
  if (!el) return;

  if (!filename) {
    el.innerHTML = '<p>No post specified.</p>';
    return;
  }

  el.innerHTML = '<p class="loading">Loading…</p>';

  fetch(`files/blogs/${filename}`)
    .then(r => {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(raw => {
      const { meta, content } = parseFrontmatter(raw);
      document.title = `${meta.title || filename} — ${CONFIG.name}`;
      el.innerHTML = `
        ${meta.title ? `<h1 class="post-title">${meta.title}</h1>` : ''}
        ${meta.date  ? `<p class="post-meta">${meta.date}${meta.tags ? ' · ' + meta.tags : ''}</p>` : ''}
        <div class="post-body">${md(content)}</div>`;
    })
    .catch(() => {
      el.innerHTML = '<p>Post not found.</p>';
    });
}

function parseFrontmatter(text) {
  if (!text.startsWith('---')) return { meta: {}, content: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, content: text };
  const meta = {};
  text.slice(3, end).trim().split('\n').forEach(line => {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  });
  return { meta, content: text.slice(end + 4).trim() };
}

// ── Resume ─────────────────────────────────────────────────────────────────
function buildResume() {
  buildNav('resume.html');
  document.title = `CV — ${CONFIG.name}`;
  buildFooter();

  const wrap = document.getElementById('resumeWrap');
  if (wrap) {
    wrap.innerHTML = `<iframe src="${CONFIG.resumePDF}" title="Curriculum Vitae"></iframe>`;
  }
}

// ── Footer ─────────────────────────────────────────────────────────────────
function buildFooter() {
  const el = document.getElementById('siteFooter');
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `&copy; ${year} ${CONFIG.name} &middot; All rights reserved`;
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initTheme);
