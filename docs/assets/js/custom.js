document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function(link) {
        if (link.href.startsWith("http") && !link.href.includes(window.location.hostname)) {
            link.setAttribute("target", "_blank");
        }
    });

    // Copy-to-clipboard for install command pills.
    document.addEventListener("click", function(event) {
        var btn = event.target.closest(".copy-btn[data-copy]");
        if (!btn) return;
        event.preventDefault();
        var text = btn.getAttribute("data-copy");
        var done = function() {
            btn.classList.add("is-copied");
            setTimeout(function() { btn.classList.remove("is-copied"); }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function() {});
        } else {
            var ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); done(); } catch (e) {}
            document.body.removeChild(ta);
        }
    });
});