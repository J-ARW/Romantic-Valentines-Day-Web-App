document.addEventListener("DOMContentLoaded", function () {
    // BUTTONS & BOXES
    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");

    // SETTINGS
    let partnerName = "LILY";
    let noAttempts = 0;
    const maxNoAttempts = 5;
    let yesScale = 1;
    let hoverCooldown = false;

    const tauntMessages = [
        "Nice try 😏",
        "Not happening",
        "You sure about that?",
        "Just click yes 💗",
        "We both know the answer 😉"
    ];

    // TYPEWRITER EFFECT
    function typeWriterEffect(element, text, speed = 100) {
        element.innerHTML = "";
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    // HEARTS EFFECT
    function createHearts() {
        const heartContainer = document.createElement("div");
        heartContainer.classList.add("heart-container");
        document.body.appendChild(heartContainer);

        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";
            heartContainer.appendChild(heart);
        }

        setTimeout(() => heartContainer.remove(), 5000);
    }

    // MOVE NO BUTTON NEAR YES
    function moveNoButtonNearYes() {
        const yesRect = yesButton.getBoundingClientRect();
        const offsetX = (Math.random() - 0.5) * 100; // ±50px
        const offsetY = (Math.random() - 0.5) * 50;  // ±25px

        const newX = yesRect.left + offsetX;
        const newY = yesRect.top + offsetY;

        noButton.style.position = "fixed";
        noButton.style.left = `${Math.max(10, Math.min(window.innerWidth - noButton.offsetWidth - 10, newX))}px`;
        noButton.style.top = `${Math.max(10, Math.min(window.innerHeight - noButton.offsetHeight - 10, newY))}px`;
    }

    // REVEAL CHOICES
    function revealChoices() {
        clickButton.style.display = "none";
        choiceBox.classList.remove("hide");

        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="typed-text"></span>
        `;

        const typedTextElement = document.querySelector(".typed-text");
        setTimeout(() => {
            typeWriterEffect(typedTextElement, "Will you be my Valentine?");
        }, 500);
    }

    // YES BUTTON CLICK
    yesButton.addEventListener("click", function () {
        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="love-text">I love you baby ❤️</span>
        `;
        choiceBox.style.display = "none";
        threedBox.classList.remove("hide");
        createHearts();
    });

    // NO BUTTON HOVER
    noButton.addEventListener("mouseenter", function () {
        if (hoverCooldown) return;
        if (noAttempts >= maxNoAttempts) return;

        hoverCooldown = true;
        noAttempts++;

        moveNoButtonNearYes();

        // Grow Yes button
        yesScale += 0.15;
        yesButton.style.transform = `scale(${yesScale})`;

        // Show taunt
        const taunt = tauntMessages[Math.min(noAttempts - 1, tauntMessages.length - 1)];
        document.querySelector(".typed-text").innerHTML = taunt;

        // Shake No button
        noButton.classList.add("shake");
        setTimeout(() => noButton.classList.remove("shake"), 300);

        // Reset cooldown after 500ms
        setTimeout(() => {
            hoverCooldown = false;
        }, 500);

        // After max attempts, hide No and show final text
        if (noAttempts >= maxNoAttempts) {
            setTimeout(() => {
                noButton.style.display = "none";
                questionText.innerHTML += `<br><span class="no-choice-text">You're out of options 🤭</span>`;
            }, 500);
        }
    });

    // START BUTTON CLICK
    clickButton.addEventListener("click", revealChoices);
});
