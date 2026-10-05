// כפתור חזרה לראש העמוד - מופיע אחרי גלילה קטנה, בכל עמודי האתר
(function () {
    const button = document.createElement("button");
    button.className = "back-to-top";
    button.type = "button";
    button.setAttribute("aria-label", "חזרה לראש העמוד");
    button.innerHTML =
        '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' +
        '<path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';

    document.body.appendChild(button);

    function toggleButton() {
        button.classList.toggle("visible", window.scrollY > 400);
    }

    window.addEventListener("scroll", toggleButton, { passive: true });
    toggleButton();

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();
