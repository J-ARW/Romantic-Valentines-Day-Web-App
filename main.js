document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");

    let partnerName = "LILY";
    let noClickCount = 0;
    let yesScale = 1;

    const tauntMessages = [
        "Nice try 😏",
        "Not happening",
        "You sure about that?",
        "Just click yes 💗",
        "We both know the answer 😉"
    ];

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

    function moveNoButton() {
        const rect = noButton.getBoundingClientRect();
        const padding = 20;

        const maxX = window.innerWidth - rect.width - padding;
        const maxY = window.innerHeight - rect.height - padding;

        const randomX = Math.random() * maxX + padding;
        const randomY = Math.random() * maxY + padding;

        noButton.style.position = "fixed";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }

    yesButton.addEventListener("click", function () {
        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="love-text">I love you baby ❤️</span>
        `;
        choiceBox.style.display = "none";
        threedBox.classList.remove("hide");
        createHearts();
    });

    let noCooldown - false; //Prevent multiple triggers at once
    let noAttempts = 0; // Count how many times the user tried to click No
    const maxAttempts= 5; // Only allow 5 dodges

    noButton.addEventListener("mouseenter", function () {
        if (noCooldown) return; // If cooldown active, do nothing
        if (noAttempts >= maxNoAttempts) return; // Stop moving after max attempts
        
        noCooldown = true;
        noClickCount++;

        // Move No Button
        moveNoButton();

        // Shake effect
        noButton.classList.add("shake");
        setTimeout(() => noButton.classList.remove("shake"), 300);

        // Grow Yes Button
        yesScale += 0.15;
        yesButton.style.transform = `scale(${yesScale})`;

        // Show Taunt
        const taunt =
            tauntMessages[Math.min(noClickCount - 1, tauntMessages.length - 1)];
        document.querySelector(".typed-text").innerHTML = taunt;

        // Final Lock
        if (noAttemps >= maxNoAttempts) {
            setTimeout(() => {
                noButton.style.display = "none";
                questionText.innerHTML +=
                    `<br><span class="no-choice-text">You are out of options 🤭</span>`;
            }, 500); 
        }

        // Reset Cooldown after short delay so user can trigger again
        setTimeout(() => {
            noCooldown = false;
        }, 3000; // 400ms is enough time for button to move and shake
    });

    clickButton.addEventListener("click", revealChoices);
});
