// BibTeX toggles and copy buttons.
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.bib-btn');
  if (btn) {
    var box = btn.parentElement.nextElementSibling;
    if (box && box.classList.contains('bib')) {
      var open = box.hidden;
      box.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    return;
  }
  var copy = e.target.closest('.bib-copy');
  if (copy) {
    var text = copy.parentElement.querySelector('pre').textContent;
    var done = function () { copy.textContent = 'Copied'; setTimeout(function () { copy.textContent = 'Copy'; }, 1500); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  }
});
function fallback(text) {
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch (err) {}
  document.body.removeChild(ta);
}
