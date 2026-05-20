---
title: How to Use My Academic Homepage Template
date: 2026-05-20
tags: Tutorial, Tips
---

This is the template I built for my personal academic homepage, hosted on GitHub Pages. It is a pure static site — no build tools, no frameworks, just HTML / CSS / JavaScript. This post walks you through how to use and customize it.

## File Structure

```
academic-homepage/
├── index.html            # Home page
├── publications.html     # Publications
├── blog.html             # Blog list
├── blog-post.html        # Blog post renderer
├── assets/
│   ├── css/style.css     # All styles
│   └── js/app.js         # All logic
├── data/
│   ├── config.js         # Personal info & settings
│   ├── publications.js   # Paper list
│   ├── news.js           # News items
│   └── blog.js           # Blog card list
├── files/
│   ├── cv.pdf            # Your CV
│   ├── papers/           # Paper PDFs
│   └── blogs/            # Markdown blog posts ← you are here
└── update.sh             # One-command deploy script
```

All content lives in the `data/` folder. You rarely need to touch anything else.

---

## 1. Personal Information — `data/config.js`

Open `data/config.js` and fill in your information:

```js
const CONFIG = {
  name:        "Your Name",
  title:       "Ph.D. Student",
  institution: "Department of Computer Science\nYour University",
  bio:         "I am a **Ph.D. student** at ...",  // Markdown supported
  avatar:      "assets/img/avatar.jpg",
  resumePDF:   "files/cv.pdf",
  social: {
    email:    "you@email.com",
    github:   "https://github.com/yourname",
    scholar:  "",            // leave empty to hide
    twitter:  "",
    linkedin: "",
  },
  clustrmaps: "YOUR_ID",    // visitor map — see below
};
```

**Tips:**
- `\n` in `institution` creates a line break
- `bio` supports full **Markdown** syntax
- Any social field left as `""` is automatically hidden

---

## 2. News — `data/news.js`

```js
const NEWS = [
  { date: "2026-05", text: "Paper accepted at **CVPR 2026**!" },
  { date: "2026-01", text: "Started internship at [Lab Name](https://...)." },
];
```

Supports **inline Markdown**: bold, italic, links. Put the most recent news at the top.

---

## 3. Publications — `data/publications.js`

Each paper is one object in the `PUBLICATIONS` array:

```js
{
  title:   "Your Paper Title",
  authors: ["Alice", "Your Name", "Bob"],
  me:      "Your Name",          // bold + underline in author list
  equal:   ["Alice", "Your Name"], // † equal contribution (optional)
  venue:   "CVPR Highlight",
  year:    2026,
  thumbnail: "",                 // "" → auto-render PDF first page
  links: {
    paper:  "files/papers/mypaper.pdf",
    arxiv:  "https://arxiv.org/abs/xxxx.xxxxx",
    code:   "https://github.com/...",
    demo:   "",                  // omit or leave "" to hide
  },
  tags: ["Computer Vision", "Robotics"],
},
```

**Thumbnail priority:**
1. Manual image path → `thumbnail: "assets/img/papers/fig.png"`
2. Manual PDF path → `thumbnail: "assets/img/teaser.pdf"` (PDF.js renders first page)
3. Empty → auto-renders `links.paper` first page via PDF.js

Place paper PDFs in `files/papers/`.

---

## 4. Blog — `data/blog.js`

**Internal post** (Markdown file in this repo):
```js
{
  title:   "My Post Title",
  date:    "2026-05-20",
  url:     "blog-post.html?post=my-post.md",  // ← filename in files/blogs/
  image:   "",      // auto-previews the rendered page
  tags:    ["Tutorial"],
  summary: "A brief description.",
},
```

**External post** (Medium, Zhihu, CSDN, etc.):
```js
{
  title:   "My External Post",
  date:    "2026-04-01",
  url:     "https://medium.com/@you/...",
  image:   "",      // gradient placeholder
  tags:    ["Research"],
  summary: "",
},
```

### Writing a Markdown blog post

Create a `.md` file in `files/blogs/` with a frontmatter header:

```markdown
---
title: My Post Title
date: 2026-05-20
tags: Research, Tutorial
---

Write your content in **Markdown** here.

## Section heading

- Bullet list
- Another item

> Blockquote

![Image caption](assets/img/...)
```

Supported Markdown: headings, bold/italic, links, images, code blocks, lists, blockquotes, tables, horizontal rules.

---

## 5. CV / Resume

Place your PDF at `files/cv.pdf`. The **CV** button in the navigation bar opens it directly in a new tab. To change the path, edit `resumePDF` in `config.js`.

---

## 6. Visitor Map

The homepage shows a geographic visitor map powered by [Clustrmaps](https://clustrmaps.com).

1. Sign up at clustrmaps.com (free)
2. Add your GitHub Pages URL
3. Copy the ID from the embed code (the value after `d=`)
4. Set it in `config.js`: `clustrmaps: "YOUR_ID"`

---

## 7. Deploying to GitHub Pages

**First time:**
```bash
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main --force
```
Then go to **Settings → Pages → Source → GitHub Actions** in your repository.

**Every update:**
```bash
./update.sh                        # auto commit message: "Update site YYYY-MM-DD"
./update.sh "Add CVPR 2026 paper"  # custom commit message
```

GitHub Actions automatically injects the last commit date into the "Last updated" display — no manual editing needed.

---

## 8. Dark Mode

The site supports automatic dark/light mode based on system preference, with a manual toggle button (☾ / ☀) in the top-right corner.

---

That covers everything. Feel free to open an issue or reach out if you have questions!
