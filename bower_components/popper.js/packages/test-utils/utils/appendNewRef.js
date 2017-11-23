export default function appendNewRef(id, text, container) {
  const jasmineWrapper = document.getElementById('jasmineWrapper');

  const ref = document.createElement('div');
  ref.id = id;
  ref.className = 'ref';
  ref.textContent = text || 'reference';
  (container || jasmineWrapper).appendChild(ref);
  return ref;
}
