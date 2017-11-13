import getOffsetParent from './getOffsetParent';

export default function isOffsetContainer(element) {
  const { nodeName } = element;
  if (nodeName === 'BODY') {
    return false;
  }
  return (
    nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element
  );
}
