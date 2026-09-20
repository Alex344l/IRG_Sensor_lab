// ==============================
// SENSOR LAB - index.js
// ==============================


// ---------- FEATURE CARDS ----------

const featureCards = document.querySelectorAll(".feature-card");

featureCards.forEach(card => {

    card.addEventListener("click", () => {

        // Remove active state from all cards
        featureCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove("active");
            }
        });

        // Toggle active state on clicked card
        card.classList.toggle("active");

    });

});


// ---------- TEST BUTTON ----------

const testButton = document.getElementById("testButton");

if (testButton) {

    testButton.addEventListener("click", () => {

        testButton.textContent = "Loading...";

        setTimeout(() => {
            testButton.textContent = "Test Backend";
        }, 1000);

    });

}


// ---------- CONSOLE MESSAGE ----------

console.log("Sensor Lab JavaScript loaded.");