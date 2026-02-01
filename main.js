document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");

    let partnerName = "LILY"; // Replace with dynamic value
    let noClickCount = 0; // Counter for No button clicks
    let yesScale = 1; // Yes Scales
    let tauntMessages = [ // Taunt Messages
        "Nice Try 😏",
        "Not Happening",
        "You sure about that?",
        "Just click yes",
        "We both know the answer"
    ];

    // Function to create typewriter effect
    function typeWriterEffect(element, text, speed = 100) {
        element.innerHTML = ""; // Clear previous text
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.innerHTML += `<span class="typewriter"></span>`; // Cursor effect
            }
        }
        typing();
    }

    // Function to handle the click event
    function revealChoices() {

        clickButton.style.display = "none"; // Hide the button
        choiceBox.classList.remove("hide"); // Show Yes/No options

        // Show partner name instantly
        questionText.innerHTML = `<span class="partner-name">${partnerName}</span><br><span class="typed-text"></span>`;

        // Start typewriter effect for the second line
        const typedTextElement = document.querySelector(".typed-text");
        setTimeout(() => {
            typeWriterEffect(typedTextElement, "Will you be my Valentine?");
        }, 500); // Delay to allow smooth transition
    }

    function createHearts() {
        const heartContainer = document.createElement("div");
        heartContainer.classList.add("heart-container");
        document.body.appendChild(heartContainer);
    
        for (let i = 0; i < 30; i++) {
            let heart = document.createElement("div");
            heart.classList.add("heart");
            
            // Random positioning and animation speed
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";
            
            heartContainer.appendChild(heart);
    }
        
    function moveNoButton() {
        const buttonRect = noButton.getBoundingClientRect();
        const maxX = window.innerWidth - buttonRect.width;
        const maxY = window.innerHeight - buttonRect.height;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noButton.style.position = "fixed";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
        
    }
    
        // Remove hearts after animation ends
        setTimeout(() => {
            heartContainer.remove();
        }, 5000);
    }
    
    yesButton.addEventListener("click", function () {
        questionText.innerHTML = `<span class="partner-name">${partnerName}</span><br><span class="love-text">I love you baby ❤️</span>`;
        choiceBox.style.display = "none"; // Hide choices
        threedBox.classList.remove("hide");

        createHearts();
    });

      // Handle "No" button click with movement
    noButton.addEventListener("mouseenter", function () {
        noClickCount++; // Increment No click count

       // Move No Button (Stay In Screen)
        const buttonRect = noButton.getBoundingClientRect();
        const padding = 20;

        const maxX = window.innerWidth - buttonRect.width - padding;
        const maxY = window.innerHeight - buttonRect.height - padding;

        const randomX = Math.random() * maxX + padding;
        const randomY = Math.random() * maxY + padding;

        noButton.style.position = "fixed";
        noButton.style.left = '${randomX}px';
        noButton.style.top = '${randomY}px';

        // Shake Effect
        noButton.classList.add("shake");
        setTimout(() => noButton.classList.remove("shake"), 300);

        // Grow Yes Button
        yesScale += 0.15;
        yesButton.style.transform = 'scale(${yesScale})';

        // Taunting Text
        const taunt = 
            tauntMessages[Math.min(noClickCount - 1, tauntMessages.length - 1)];

        questionText.querySelector(".typed-text").innerHTML = taunt;

        // Final Lock in
        if (noClickCount >=6) {
            noButton.style.display = "none";
            questionText.innerHTML += '<br><span class="no-choice-text">You're out of options? <span>';

        }
    });

    clickButton.addEventListener("click", revealChoices);
});
