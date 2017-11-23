export default function simulateScroll(
  element,
  { scrollTop, scrollLeft, delay }
) {
  const scrollingElement = element === document.body
    ? document.scrollingElement || document.documentElement
    : element;

  const applyScroll = () => {
    if (scrollTop !== undefined) {
      scrollingElement.scrollTop = scrollTop;
    }
    if (scrollLeft !== undefined) {
      scrollingElement.scrollLeft = scrollLeft;
    }
  };

  if (delay !== undefined) {
    setTimeout(applyScroll, delay);
  } else {
    applyScroll();
  }
}
