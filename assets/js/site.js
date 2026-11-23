// Isoline site: progressive enhancement only (the site works without JS).
// Adds a "Copy" button to code samples marked with data-copy.
(function () {
  "use strict";
  var label = { hr: ["Kopiraj", "Kopirano"], en: ["Copy", "Copied"], ru: ["Копировать", "Скопировано"] };
  var lang = (document.documentElement.lang || "en").slice(0, 2);
  var t = label[lang] || label.en;
  if (!navigator.clipboard) return;
  document.querySelectorAll("pre[data-copy]").forEach(function (pre) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "copy";
    b.textContent = t[0];
    b.addEventListener("click", function () {
      var code = pre.querySelector("code");
      navigator.clipboard.writeText((code || pre).innerText).then(function () {
        b.textContent = t[1];
        setTimeout(function () { b.textContent = t[0]; }, 1600);
      });
    });
    pre.appendChild(b);
  });
})();
