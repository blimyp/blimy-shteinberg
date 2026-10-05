// בועות קטנטנות שמתפוצצות סביב סמן העכבר - בכל עמודי האתר
(function () {
    // רק במכשירים עם עכבר, ולא למי שביקש להפחית תנועה
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const colors = ["#03f1a2", "#ffffff", "#22d3ee", "#a78bfa"];
    const maxBubbles = 60;
    let lastTime = 0;
    let count = 0;

    window.addEventListener("mousemove", e => {
        const now = performance.now();
        if (now - lastTime < 20 || count >= maxBubbles) return;
        lastTime = now;

        const bubble = document.createElement("span");
        bubble.className = "cursor-bubble";

        const size = 20 + Math.random() * 8;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        bubble.style.left = e.clientX + "px";
        bubble.style.top = e.clientY + "px";
        bubble.style.color = colors[Math.floor(Math.random() * colors.length)];
        // כיוון אקראי לכל הצדדים סביב הסמן
        const angle = Math.random() * Math.PI * 2;
        const distance = 25 + Math.random() * 35;
        bubble.style.setProperty("--dx", Math.cos(angle) * distance + "px");
        bubble.style.setProperty("--dy", Math.sin(angle) * distance + "px");

        document.body.appendChild(bubble);
        count++;

        bubble.addEventListener("animationend", () => {
            bubble.remove();
            count--;
        });
    }, { passive: true });
})();
