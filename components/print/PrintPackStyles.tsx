/**
 * Print-pack geometry and print rules, rendered inline so they live and die
 * with the route. An `@page { margin: 0 }` in globals.css would strip the
 * margins — and Chrome's date/URL header — from every other page's print too,
 * and a CSS chunk stays loaded across client-side navigation. A <style> in the
 * tree unmounts with the page. The `@page { size }` rule itself is emitted by
 * PrintPackShell, because the paper size is client state.
 *
 * Backgrounds use the CSS variables rather than Tailwind's bg-paper classes on
 * purpose: globals.css whitens those classes under @media print, which would
 * invert the card (white cells on a tinted page).
 */
const css = `
.pp-desk {
  background: var(--ink-subtle);
  padding: 24px 16px;
  overflow-x: auto;
}
.pp-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  zoom: var(--pp-zoom, 1);
}
.pp-page {
  width: 8.5in;
  height: 11in;
  padding: 0.55in 0.6in;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 1.2;
}
.pp-page--cover {
  padding: 0.7in 0.75in;
}
[data-paper="a4"] .pp-page {
  width: 210mm;
  height: 297mm;
}
.pp-cell {
  background: var(--paper-card);
  border: 1px solid var(--hairline);
}
.pp-cell--ink {
  background: var(--ink);
  border-color: var(--ink);
}
.pp-tip {
  background: var(--paper-card);
  border: 1px solid var(--hairline);
}
.pp-tick {
  width: 8px;
  height: 8px;
  border: 1px solid var(--ink-subtle);
  flex-shrink: 0;
  margin-top: 3px;
}

@media print {
  html, body {
    background: #fff !important;
    margin: 0 !important;
  }
  body {
    display: block !important;
    min-height: 0 !important;
  }
  .pp-root {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
  .pp-root > * {
    margin: 0 !important;
  }
  .pp-desk {
    background: none !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible !important;
  }
  .pp-stack {
    display: block !important;
    zoom: 1 !important;
  }
  .pp-page {
    box-shadow: none !important;
    margin: 0 !important;
    break-after: page;
    page-break-after: always;
    break-inside: avoid;
  }
  .pp-page:last-child {
    break-after: auto;
    page-break-after: auto;
  }
  .pp-page, .pp-page * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
`;

export default function PrintPackStyles() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
