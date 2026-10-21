// Contact details and profile links, used by the Footer, ContactCTA, and the
// Publications page. index.html repeats the profile URLs in its JSON-LD
// "sameAs" list; src/data/profiles.test.js fails if the two drift apart.

export const EMAIL = "onjeru@usiu.ac.ke";

export const PROFILES = {
  github: {
    label: "GitHub",
    handle: "github.com/olivernjeru",
    href: "https://github.com/olivernjeru",
  },
  linkedin: {
    label: "LinkedIn",
    handle: "linkedin.com/in/olivernjeru",
    href: "https://www.linkedin.com/in/olivernjeru/",
  },
  scholar: {
    label: "Scholar",
    handle: "Oliver Njeru",
    href: "https://scholar.google.com/citations?user=V9-eteEAAAAJ&hl=en",
  },
  orcid: {
    label: "ORCID",
    handle: "0009-0008-6611-3813",
    href: "https://orcid.org/0009-0008-6611-3813",
  },
  unsplash: {
    label: "Unsplash",
    handle: "@olivernjeru",
    href: "https://unsplash.com/@olivernjeru",
  },
  figma: {
    label: "Figma",
    handle: "@olivernjeru",
    href: "https://figma.com/@olivernjeru",
  },
};
