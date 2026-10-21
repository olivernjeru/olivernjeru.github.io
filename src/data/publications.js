// Single source of truth for publications. Read by:
//   src/components/Hero.jsx         publication count and venues stat
//   src/sections/SelectedWork.jsx   home-page cards
//   src/pages/PublicationsPage.jsx  /publications.html, including APA citations
// Field reference and how to add a paper: src/data/README.md.
// Keep entries newest first (src/data/publications.test.js checks the order).

export const SELF = { given: "Oliver", family: "Njeru" };

const VINE_AAM = "/papers/njeru2026marketdatagovernance_AAM.pdf";
const DBAPI_PDF = "http://www.ist-africa.org/Conference2025/outbox/ISTAfrica_Paper_ref_87_13712.pdf";

export const publications = [
  {
    id: "njeru2026vine",
    type: "journal",
    title:
      "Market data governance as knowledge management: managing temporality via rule versioning, provenance and auditability",
    apaTitle:
      "Market data governance as knowledge management: Managing temporality via rule versioning, provenance and auditability",
    authors: [
      { given: "Oliver", family: "Njeru" },
      { given: "Paul", family: "Okanda" },
    ],
    date: "2026-10-20",
    venue: "VINE Journal of Information and Knowledge Management Systems",
    venueShort: "VINE JIKMS",
    status: "Ahead of print",
    doi: "10.1108/VJIKMS-03-2026-0132",
    links: [
      { kind: "published", label: "Published version", href: "https://doi.org/10.1108/VJIKMS-03-2026-0132" },
      {
        kind: "manuscript",
        label: "Free PDF",
        href: VINE_AAM,
        note: "The free PDF is the accepted manuscript, shared under a CC BY-NC 4.0 license.",
        license: "https://creativecommons.org/licenses/by-nc/4.0/",
      },
      { kind: "data", label: "Data and code", href: "https://doi.org/10.5281/zenodo.22734804" },
    ],
  },
  {
    id: "kwon2024spark",
    type: "conference",
    title: "SPARK: Harnessing Human-Centered Workflows with Biomedical Foundation Models for Drug Discovery",
    apaTitle: "SPARK: Harnessing human-centered workflows with biomedical foundation models for drug discovery",
    // Order and spelling as in the IJCAI-24 proceedings BibTeX.
    authors: [
      { given: "Bum Chul", family: "Kwon" },
      { given: "Simona", family: "Rabinovici-Cohen" },
      { given: "Beldine", family: "Moturi" },
      { given: "Ruth", family: "Mwaura" },
      { given: "Kezia", family: "Wahome" },
      { given: "Oliver", family: "Njeru" },
      { given: "Miguel", family: "Shinyenyi" },
      { given: "Catherine", family: "Wanjiru" },
      { given: "Sekou", family: "Remy" },
      { given: "William", family: "Ogallo" },
      { given: "Itai", family: "Guez" },
      { given: "Partha", family: "Suryanarayanan" },
      { given: "Joseph", family: "Morrone" },
      { given: "Shreyans", family: "Sethi" },
      { given: "Seung-Gu", family: "Kang" },
      { given: "Tien", family: "Huynh" },
      { given: "Kenney", family: "Ng" },
      { given: "Diwakar", family: "Mahajan" },
      { given: "Hongyang", family: "Li" },
      { given: "Matan", family: "Ninio" },
      { given: "Shervin", family: "Ayati" },
      { given: "Efrat", family: "Hexter" },
      { given: "Wendy", family: "Cornell" },
    ],
    date: "2024-08-08",
    venue: "International Joint Conference on Artificial Intelligence (IJCAI-24)",
    venueShort: "IJCAI",
    track: "Demo Track",
    container: "Proceedings of the Thirty-Third International Joint Conference on Artificial Intelligence",
    editors: [{ given: "Kate", family: "Larson" }],
    pages: "8713–8716",
    publisher: "International Joint Conferences on Artificial Intelligence Organization",
    doi: "10.24963/ijcai.2024/1015",
    links: [
      { kind: "published", label: "Published version", href: "https://doi.org/10.24963/ijcai.2024/1015" },
      { kind: "pdf", label: "Free PDF", href: "https://www.ijcai.org/proceedings/2024/1015.pdf" },
    ],
  },
  {
    id: "okanda2024dbapi",
    type: "conference",
    title: "DbAPI: A Backend-as-a-Service Platform for Rapid Deployment of Cloud Services",
    apaTitle: "DbAPI: A backend-as-a-service platform for rapid deployment of cloud services",
    authors: [
      { given: "Paul", family: "Okanda" },
      { given: "Ankit", family: "Chhatbar" },
      { given: "Oliver", family: "Njeru" },
    ],
    date: "2024-05-22",
    venue: "IST-Africa 2024 Conference",
    venueShort: "IST-Africa",
    // Two published versions exist. Cited: the IEEE Xplore version (Crossref:
    // "2024 IST-Africa Conference (IST-Africa)", pp. 1-12, IEEE), because APA
    // prefers a DOI. The other is IST-Africa's own proceedings (eds. Miriam and
    // Paul Cunningham, IST-Africa Institute and IIMC, ISBN 978-1-905824-72-4),
    // whose open-access PDF is linked below; ist-africa.org serves HTTP only.
    // Their policy needs written permission from the publishers and every author
    // before the PDF may be reproduced, so it is linked, not self-hosted.
    container: "2024 IST-Africa Conference (IST-Africa)",
    pages: "1–12",
    publisher: "IEEE",
    doi: "10.23919/ist-africa63983.2024.10569490",
    links: [
      {
        kind: "published",
        label: "Published version",
        href: "https://doi.org/10.23919/ist-africa63983.2024.10569490",
      },
      {
        kind: "pdf",
        label: "Free PDF",
        href: DBAPI_PDF,
        note: "The free PDF is IST-Africa's open-access copy; their server supports HTTP only.",
      },
    ],
  },
];
