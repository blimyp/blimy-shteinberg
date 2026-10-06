// אנימציית הקלדה - מחליפה בין המילים שב-data-words
(function () {
    const elements = document.querySelectorAll(".typing-text[data-words]");

    elements.forEach(function (el) {
        const words = el.dataset.words.split(",").map(function (w) { return w.trim(); });
        let wordIndex = 0;
        let charIndex = words[0].length;
        let deleting = true;

        function tick() {
            const word = words[wordIndex];

            if (deleting) {
                charIndex--;
                el.textContent = word.slice(0, charIndex);

                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(tick, 400);
                    return;
                }
                setTimeout(tick, 60);
            } else {
                const next = words[wordIndex];
                charIndex++;
                el.textContent = next.slice(0, charIndex);

                if (charIndex === next.length) {
                    deleting = true;
                    setTimeout(tick, 2000);
                    return;
                }
                setTimeout(tick, 110);
            }
        }

        setTimeout(tick, 2500);
    });
})();
