// In-page navigation for the home page sections.

// Height of the sticky header, so a section never lands underneath it.
export const HEADER_OFFSET = 70;

// Scrolls to the element with this id. Returns false when there is no such element.
export const scrollToSection = (id, behavior = "smooth") => {
  const el = document.getElementById(id);
  if (!el) return false;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior,
  });
  return true;
};
