import { describe, expect, it } from 'vitest';
import { PUBLICATIONS_URL, publicationsJsonLd, toJsonLdScript } from './structuredData.js';
import { publications, SELF } from '../data/publications.js';
import { PROFILES } from '../data/profiles.js';

const selfSameAs = Object.values(PROFILES).map((p) => p.href);
const graph = publicationsJsonLd(publications, { self: SELF, selfSameAs })['@graph'];
const byId = (id) => graph.find((node) => node['@id'] === `${PUBLICATIONS_URL}#${id}`);

describe('publicationsJsonLd', () => {
  it('describes every publication as a ScholarlyArticle', () => {
    expect(graph).toHaveLength(publications.length);
    graph.forEach((node) => expect(node['@type']).toBe('ScholarlyArticle'));
  });

  it('links each paper to its DOI', () => {
    expect(byId('kwon2024spark').sameAs).toBe('https://doi.org/10.24963/ijcai.2024/1015');
    expect(byId('okanda2024dbapi').identifier).toEqual({
      '@type': 'PropertyValue',
      propertyID: 'DOI',
      value: '10.23919/ist-africa63983.2024.10569490',
    });
  });

  it('identifies the site owner, and only the site owner, with profile links', () => {
    const vine = byId('njeru2026vine');
    const owner = vine.author.find((a) => a.name === 'Oliver Njeru');
    expect(owner.sameAs).toContain(PROFILES.orcid.href);
    vine.author.filter((a) => a !== owner).forEach((a) => expect(a.sameAs).toBeUndefined());
  });

  it('describes the free copy, with the manuscript license when there is one', () => {
    expect(byId('njeru2026vine').encoding).toEqual({
      '@type': 'MediaObject',
      contentUrl: 'https://olivernjeru.github.io/papers/njeru2026marketdatagovernance_AAM.pdf',
      encodingFormat: 'application/pdf',
      license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    });
    expect(byId('kwon2024spark').isAccessibleForFree).toBe(true);
  });

  it('places journal articles in a periodical and conference papers in proceedings', () => {
    expect(byId('njeru2026vine').isPartOf['@type']).toBe('Periodical');
    expect(byId('okanda2024dbapi').isPartOf).toEqual({
      '@type': 'Book',
      name: '2024 IST-Africa Conference (IST-Africa)',
      publisher: { '@type': 'Organization', name: 'IEEE' },
    });
  });
});

describe('toJsonLdScript', () => {
  it('escapes "<" so data cannot close the script element', () => {
    const script = toJsonLdScript({ name: '</script><script>alert(1)</script>' });
    expect(script).not.toContain('<');
    expect(JSON.parse(script).name).toBe('</script><script>alert(1)</script>');
  });
});
