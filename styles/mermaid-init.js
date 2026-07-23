/* ============================================================
   Shared mermaid configuration — Sixth World palette.

   Every page used to call mermaid.initialize() with no theme, so
   diagrams rendered in the default pastel scheme and main.css then
   forced label text to near-black — which is invisible on the dark
   page. Theming mermaid at the source is the reliable fix.

   Because mermaid bakes colours into the SVG at render time, this
   module keeps each diagram's source text and exposes
   window.srRenderMermaid() so site-nav.js can redraw everything
   when the reader flips between light and dark.
   ============================================================ */
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

/* These carry the light label ink in dark mode, so each is held at a luminance
   that keeps the text above 4.5:1 — the first pass used mid-tones and mindmap
   labels came out at 2.4:1. */
const scale = ['#2e1d59', '#0c2d22', '#4f1734', '#162647',
               '#2c2045', '#362306', '#1a263e', '#381d41'];

function palette(isLight) {
  const ink = isLight ? '#241d3d' : '#eae6f8';
  return {
    darkMode: !isLight,
    background: isLight ? '#ffffff' : '#191333',
    fontFamily: '"Segoe UI", -apple-system, Arial, sans-serif',
    fontSize: '15px',

    primaryColor:       isLight ? '#f0eafc' : '#241c46',
    primaryTextColor:   ink,
    primaryBorderColor: isLight ? '#7a4fd0' : '#a06bff',
    secondaryColor:     isLight ? '#e6f6ef' : '#1d2f3f',
    secondaryTextColor: ink,
    secondaryBorderColor: isLight ? '#0f7a52' : '#3fd18b',
    tertiaryColor:      isLight ? '#f6f4fd' : '#15102b',
    tertiaryTextColor:  ink,
    tertiaryBorderColor: isLight ? '#d2c9e8' : '#362b5e',

    lineColor:   isLight ? '#6a5f8c' : '#8d81b8',
    textColor:   ink,
    mainBkg:     isLight ? '#f0eafc' : '#241c46',
    nodeBorder:  isLight ? '#7a4fd0' : '#a06bff',
    nodeTextColor: ink,
    edgeLabelBackground: isLight ? '#ffffff' : '#191333',
    clusterBkg:  isLight ? 'rgba(122,79,208,0.07)' : 'rgba(160,107,255,0.07)',
    clusterBorder: isLight ? '#d2c9e8' : '#362b5e',
    titleColor:  isLight ? '#6d34c8' : '#a06bff',

    /* notes default to a pale yellow, which strands the label text in dark mode */
    noteBkgColor:   isLight ? '#f3eefc' : '#231c40',
    noteTextColor:  ink,
    noteBorderColor: isLight ? '#d2c9e8' : '#362b5e',

    ...Object.fromEntries(scale.flatMap((c, i) => [
      [`cScale${i}`, isLight ? ['#e7dcfa', '#d8f0e6', '#fadde5', '#dbe6fa',
                                '#ece0fa', '#faeeda', '#dfe6f6', '#f0dcf6'][i] : c],
      [`cScaleLabel${i}`, ink],
    ])),
  };
}

const nodes = Array.prototype.slice.call(document.querySelectorAll('.mermaid'));
// stash the source before the first render replaces it with SVG
nodes.forEach(function (n) { n.setAttribute('data-src', n.textContent); });

async function render() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: palette(isLight),
    flowchart: { curve: 'basis', useMaxWidth: true },
    timeline: { useMaxWidth: true },
    journey: { useMaxWidth: true },
  });
  nodes.forEach(function (n) {
    n.innerHTML = n.getAttribute('data-src');
    n.removeAttribute('data-processed');
  });
  if (nodes.length) await mermaid.run({ nodes: nodes });
}

window.srRenderMermaid = render;
render();
