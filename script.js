(function () {
    emailjs.init("a9upb4z0sKTekMhII");
})();

const cards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

cards.forEach(card => {
    observer.observe(card);
});

const title = document.querySelector('.hero-title');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        title.classList.add('scrolled');
    } else {
        title.classList.remove('scrolled');
    }
});

function highlightEffect(text) {
    return text.replaceAll(
        "אפקט",
        `<span class="glow-effect">אפקט</span>`
    );
}

const ads = [
    { text: "יש לך עסק ואין לקוחות?", anim: "fill-green" },
    { text: "מחפש איך למשוך אליך אנשים?", anim: "slide-left" },
    { text: "רוצה במה לעסק שלך?", anim: "scale" },
    { text: "הגעת למקום הנכון!", anim: "fade" },
    { text: "אפקט תעשה לך את העבודה הטובה ביותר", anim: "slide-left" },
    { text: "אתר עסקי בעיצוב מודרני עם ממשק משתמש קליל וזורם", anim: "scale" },
    { text: "והמחיר - ממש לא מה שאתם חושבים", anim: "fade" },
    { text: "אפקט תתן לכם מחיר ושרות ללא תחרות", anim: "letters" }
];

let index = 0;
const adText = document.getElementById("ad-text");

function showAd() {
    const ad = ads[index];

    adText.className = "ad-text";
    adText.innerHTML = "";

    if (ad.anim === "letters") {
        adText.classList.add("letters");

        const words = ad.text.split(" ");

        words.forEach((word, i) => {
            const wordSpan = document.createElement("span");
            wordSpan.style.display = "inline-block";
            wordSpan.style.marginLeft = "5px";

            if (word === "אפקט") {
                wordSpan.classList.add("glow-effect");
                wordSpan.textContent = word;
            } else {
                word.split("").forEach((char, j) => {
                    const charSpan = document.createElement("span");

                    if (char === " ") {
                        charSpan.innerHTML = "&nbsp;";
                    } else {
                        charSpan.textContent = char;
                    }

                    charSpan.style.animationDelay = `${(i * 5 + j) * 0.03}s`;
                    wordSpan.appendChild(charSpan);
                });
            }

            adText.appendChild(wordSpan);
        });
    } else {
        adText.innerHTML = highlightEffect(ad.text);
        adText.classList.add(ad.anim);
    }

    index = (index + 1) % ads.length;
}

showAd();
setInterval(showAd, 3000);

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    sendEmail(this);
});

const adsForm = document.getElementById("ads-form");

adsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendEmail(this);
});

function sendEmail(formData) {
    emailjs.sendForm(
        "service_z4cxu6c",
        "template_hunj01l",
        formData
    ).then(
        function () {
            showPopup();
            formData.reset();
        },
        function (error) {
            alert("שגיאה בשליחה");
            console.log(error);
        }
    );
}

const popup = document.getElementById("success-popup");
const overlay = document.getElementById("overlay");

function showPopup() {
    popup.classList.remove("hide");
    popup.classList.add("show");
    overlay.classList.remove("hide");
    overlay.classList.add("show");
    setTimeout(() => {
        createBubbles();
    }, 500);
}

const closeBtn = document.getElementById("close-popup");

closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
    popup.classList.add("hide");
    overlay.classList.remove("show");
    overlay.classList.add("hide");
});

function createBubbles() {
    const colors = ["var(--green)", "var(--blue)", "var(--purple)"];

    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const color = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.background = `radial-gradient(circle, white, ${color})`;

        // מיקום התחלתי – מרכז הפופאפ
        const rect = popup.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;

        bubble.style.left = startX + "px";
        bubble.style.top = startY + "px";

        // כיוון רנדומלי
        const x = (Math.random() - 0.5) * 1600;
        const y = (Math.random() - 0.5) * 1600;

        bubble.style.setProperty("--x", `${x}px`);
        bubble.style.setProperty("--y", `${y}px`);

        bubble.style.animation = `bubbleMove 3.5s ease-out forwards`;

        document.body.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 4000);
    }
}

document.getElementById("contact-btn").addEventListener("click", function () {
    document.getElementById("contact-form").scrollIntoView({
        behavior: "smooth"
    });
});

const btn = document.getElementById("ads-contact-btn");

btn.addEventListener("click", () => {
    document.getElementById("ad-text").style.display = "none";
    document.getElementById("ads-form").style.display = "flex";
    document.getElementById("ads-contact-btn").style.display = "none";
    document.getElementById("hand-icon").style.display = "none";
    document.getElementById("ads-button-form").style.display = "block";
});