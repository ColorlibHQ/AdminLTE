export default function prepend(node, parent) {
  parent.insertBefore(node, parent.firstChild);
}
