// ── Publications ───────────────────────────────────────────────────────────
// Fields:
//   title       — paper title
//   authors     — list of author names exactly as written
//   me          — your name as it appears in authors (will be bold + underlined)
//   venue       — conference or journal full name
//   year        — publication year (used for sorting)
//   thumbnail   — path to preview image (e.g. "assets/img/papers/paper1.png")
//                 leave "" to auto-render the PDF first page via PDF.js
//   links       — any subset of: paper, arxiv, code, demo, video, slides, poster, website
//                 leave "" or omit to hide that link
//   tags        — used for the filter buttons on the Publications page

const PUBLICATIONS = [
  {
    title:   "Your Most Recent Paper Title Here",
    authors: ["First Author", "Your Name", "Third Author", "Senior Author"],
    me:      "Your Name",
    venue:   "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    year:    2025,
    thumbnail: "",   // leave empty → auto PDF preview
    links: {
      paper:   "files/papers/cvpr2025.pdf",
      arxiv:   "https://arxiv.org/abs/2500.00001",
      code:    "https://github.com/yourusername/project",
      demo:    "",
      video:   "",
    },
    tags: ["Computer Vision", "3D Generation"],
  },
  {
    title:   "Another Great Paper: Subtitle Goes Here",
    authors: ["Your Name", "Collaborator B", "Senior PI"],
    me:      "Your Name",
    venue:   "International Conference on Machine Learning (ICML)",
    year:    2024,
    thumbnail: "assets/img/papers/icml2024.png",
    links: {
      arxiv:   "https://arxiv.org/abs/2400.00002",
      code:    "https://github.com/yourusername/project2",
      video:   "",
    },
    tags: ["Robot Learning", "Reinforcement Learning"],
  },
  {
    title:   "Workshop or Preprint Paper Title",
    authors: ["Collaborator A", "Your Name"],
    me:      "Your Name",
    venue:   "arXiv preprint",
    year:    2024,
    thumbnail: "",
    links: {
      arxiv: "https://arxiv.org/abs/2400.00003",
    },
    tags: ["NLP"],
  },
];
