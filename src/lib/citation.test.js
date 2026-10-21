import { describe, expect, it } from 'vitest';
import { formatApa, formatApaAuthors, formatApaEditors, initials } from './citation.js';
import { publications } from '../data/publications.js';

const byId = (id) => {
  const pub = publications.find((p) => p.id === id);
  if (!pub) throw new Error(`No publication with id ${id}`);
  return pub;
};

// { given: "G1", family: "Family1" }, { given: "G2", family: "Family2" }, ...
const people = (n) =>
  Array.from({ length: n }, (_, i) => ({ given: `G${i + 1}`, family: `Family${i + 1}` }));

describe('initials', () => {
  it('abbreviates every given name', () => {
    expect(initials('Bum Chul')).toBe('B. C.');
  });

  it('keeps the hyphen in hyphenated given names', () => {
    expect(initials('Seung-Gu')).toBe('S.-G.');
  });
});

describe('formatApaAuthors', () => {
  it('formats a single author', () => {
    expect(formatApaAuthors([{ given: 'Oliver', family: 'Njeru' }])).toBe('Njeru, O.');
  });

  it('puts a comma before the ampersand with two authors', () => {
    expect(
      formatApaAuthors([
        { given: 'Oliver', family: 'Njeru' },
        { given: 'Paul', family: 'Okanda' },
      ])
    ).toBe('Njeru, O., & Okanda, P.');
  });

  it('lists all authors up to 20', () => {
    const text = formatApaAuthors(people(20));
    expect(text.startsWith('Family1, G.')).toBe(true);
    expect(text.endsWith(', & Family20, G.')).toBe(true);
    expect(text).not.toContain('. . .');
  });

  it('lists the first 19, an ellipsis, and the last author from 21 on', () => {
    const authors = people(21);
    const first19 = authors.slice(0, 19).map((a) => `${a.family}, G.`).join(', ');
    expect(formatApaAuthors(authors)).toBe(`${first19}, . . . Family21, G.`);
    expect(formatApaAuthors(authors)).not.toContain('&');
  });

  it('rejects an empty author list', () => {
    expect(() => formatApaAuthors([])).toThrow(/at least one author/);
  });
});

describe('formatApaEditors', () => {
  it('marks a single editor with (Ed.)', () => {
    expect(formatApaEditors([{ given: 'Kate', family: 'Larson' }])).toBe('K. Larson (Ed.)');
  });

  it('joins two editors with an ampersand and no comma', () => {
    expect(
      formatApaEditors([
        { given: 'Miriam', family: 'Cunningham' },
        { given: 'Paul', family: 'Cunningham' },
      ])
    ).toBe('M. Cunningham & P. Cunningham (Eds.)');
  });

  it('uses a serial comma for three or more editors', () => {
    expect(formatApaEditors(people(3))).toBe('G. Family1, G. Family2, & G. Family3 (Eds.)');
  });
});

describe('formatApa on the site publications', () => {
  it('cites the VINE article as an advance online publication', () => {
    expect(formatApa(byId('njeru2026vine')).text).toBe(
      'Njeru, O., & Okanda, P. (2026). Market data governance as knowledge management: ' +
        'Managing temporality via rule versioning, provenance and auditability. ' +
        'VINE Journal of Information and Knowledge Management Systems. Advance online publication. ' +
        'https://doi.org/10.1108/VJIKMS-03-2026-0132'
    );
  });

  it('cites the 23-author SPARK paper with the 21+ author rule', () => {
    expect(formatApa(byId('kwon2024spark')).text).toBe(
      'Kwon, B. C., Rabinovici-Cohen, S., Moturi, B., Mwaura, R., Wahome, K., Njeru, O., ' +
        'Shinyenyi, M., Wanjiru, C., Remy, S., Ogallo, W., Guez, I., Suryanarayanan, P., ' +
        'Morrone, J., Sethi, S., Kang, S.-G., Huynh, T., Ng, K., Mahajan, D., Li, H., . . . Cornell, W. ' +
        '(2024). SPARK: Harnessing human-centered workflows with biomedical foundation models for drug discovery. ' +
        'In K. Larson (Ed.), Proceedings of the Thirty-Third International Joint Conference on Artificial Intelligence ' +
        '(pp. 8713–8716). International Joint Conferences on Artificial Intelligence Organization. ' +
        'https://doi.org/10.24963/ijcai.2024/1015'
    );
  });

  it('cites the DbAPI paper by its IEEE Xplore DOI, without editors', () => {
    expect(formatApa(byId('okanda2024dbapi')).text).toBe(
      'Okanda, P., Chhatbar, A., & Njeru, O. (2024). ' +
        'DbAPI: A backend-as-a-service platform for rapid deployment of cloud services. ' +
        'In 2024 IST-Africa Conference (IST-Africa) (pp. 1–12). IEEE. ' +
        'https://doi.org/10.23919/ist-africa63983.2024.10569490'
    );
  });

  it('uses the URL when a paper has no DOI', () => {
    const { doi, ...pub } = { ...byId('okanda2024dbapi'), url: 'https://example.org/paper.pdf' };
    expect(doi).toBeTruthy();
    expect(formatApa(pub).text.endsWith('IEEE. https://example.org/paper.pdf')).toBe(true);
  });

  it('italicizes only the journal or proceedings title', () => {
    const italic = (id) =>
      formatApa(byId(id))
        .parts.filter((part) => part.italic)
        .map((part) => part.text);
    expect(italic('njeru2026vine')).toEqual(['VINE Journal of Information and Knowledge Management Systems']);
    expect(italic('kwon2024spark')).toEqual([
      'Proceedings of the Thirty-Third International Joint Conference on Artificial Intelligence',
    ]);
  });

  it('switches to volume, issue, and pages once the article has them', () => {
    const pub = { ...byId('njeru2026vine'), volume: 56, issue: 2, pages: '101–120' };
    const { text, parts } = formatApa(pub);
    expect(text).toContain(
      'VINE Journal of Information and Knowledge Management Systems, 56(2), 101–120. https://doi.org/'
    );
    expect(text).not.toContain('Advance online publication');
    expect(parts.filter((part) => part.italic).map((part) => part.text)).toEqual([
      'VINE Journal of Information and Knowledge Management Systems',
      '56',
    ]);
  });

  it('throws for a publication type it does not know', () => {
    expect(() => formatApa({ ...byId('njeru2026vine'), type: 'thesis' })).toThrow(/thesis/);
  });
});
