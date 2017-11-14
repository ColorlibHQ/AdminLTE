import isIE10 from './isIE10';

function getSize(axis, body, html, computedStyle) {
  return Math.max(
    body[`offset${axis}`],
    body[`scroll${axis}`],
    html[`client${axis}`],
    html[`offset${axis}`],
    html[`scroll${axis}`],
    isIE10()
      ? html[`offset${axis}`] +
        computedStyle[`margin${axis === 'Height' ? 'Top' : 'Left'}`] +
        computedStyle[`margin${axis === 'Height' ? 'Bottom' : 'Right'}`]
      : 0
  );
}

export default function getWindowSizes() {
  const body = document.body;
  const html = document.documentElement;
  const computedStyle = isIE10() && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle),
  };
}
