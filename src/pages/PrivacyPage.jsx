import React from "react";
import PageShell from "../components/PageShell.jsx";
import { SectionHeader } from "../components/primitives.jsx";
import { EMAIL } from "../data/profiles.js";
import { THEME_STORAGE_KEY } from "../themeConfig.js";

// Change this only when what the notice says changes.
const LAST_UPDATED = "May 16, 2026";

export default function PrivacyPage() {
  return (
    <PageShell page="privacy">
      <section className="section">
        <SectionHeader as="h1" kicker="House rules" title="Privacy," italic="plainly stated" />

        <div className="prose">
          <p className="prose-meta">Last updated: {LAST_UPDATED}</p>

          <p>
            This site is the personal portfolio of Oliver Njeru. It runs no analytics,
            no third-party scripts, no advertising trackers, and no fingerprinting.
          </p>

          <h2>What is stored on your device</h2>
          <ul>
            <li>
              <strong>Theme preference.</strong> Light or dark mode is saved to your
              browser&rsquo;s <code>localStorage</code> under the key{" "}
              <code>{THEME_STORAGE_KEY}</code>. The value never leaves your device.
            </li>
          </ul>

          <h2>External links</h2>
          <p>
            Links to GitHub, LinkedIn, Google Scholar, Unsplash, Figma, and other
            sites open with <code>rel=&quot;noopener noreferrer&quot;</code> so those
            destinations cannot read this site&rsquo;s context. Their own privacy
            policies apply once you click through.
          </p>

          <h2>Fonts</h2>
          <p>
            Newsreader, Inter Tight, and JetBrains Mono are bundled with the site and
            served from the same origin (no third-party font CDN, no cookies).
          </p>

          <h2>Hosting</h2>
          <p>
            Served as static files from GitHub Pages. GitHub may collect server
            access logs as described in{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub&rsquo;s privacy statement
            </a>
            .
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this notice can be sent to{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
