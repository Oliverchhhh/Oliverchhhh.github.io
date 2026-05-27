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
    title:   "StaMo: Unsupervised Learning of Generalizable Robot Motion from Compact State Representation",
    authors: ["Mingyu Liu","Jiuhe Shu","Hui Chen","Zeju Li","Canyu Zhao","Jiange Yang","Shenyuan Gao","Hao Chen","Chunhua Shen"],
    me:      "Hui Chen",
    equal:   ["Mingyu Liu","Jiuhe Shu",],
    venue:   "CVPR Highlight",
    year:    2026,
    thumbnail: "assets/img/StaMo_teaser_cvpr.pdf",   // leave empty → auto PDF preview
    links: {
      paper:   "files/papers/2510.05057v2.pdf",
      arxiv:   "https://arxiv.org/abs/2510.05057",
      code:    "https://github.com/aim-uofa/StaMo",
      demo:    "",
      video:   "",
    },
    tags: ["Computer Vision", "Embodied AI"],
  },
  {
    title:   "HORIZON: Recoverability-Governed Curriculum for Physical-Domain Scaling",
    authors: ["Chenhao Bai", "Liqin Lu", "Kaijun Wang", "Hui Chen", "Jin-Chuan Shi", "Yuyang Liu", "Hao Chen", "Chunhua Shen"],
    me:      "Hui Chen",
    venue:   "Under Review",
    year:    2026,
    thumbnail: "assets/img/corl2026.png",
    links: {
      arxiv:   "",
      code:    "https://horizon-website.github.io/HORIZON/",
      video:   "",
    },
    tags: ["Domain Randomization", " Locomotion","Embodied AI"],
  },
  // {
  //   title:   "Workshop or Preprint Paper Title",
  //   authors: ["Collaborator A", "Your Name"],
  //   me:      "Your Name",
  //   venue:   "arXiv preprint",
  //   year:    2024,
  //   thumbnail: "",
  //   links: {
  //     arxiv: "https://arxiv.org/abs/2400.00003",
  //   },
  //   tags: ["NLP"],
  // },
];
