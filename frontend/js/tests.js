// ==============================
// SENSOR LAB - tests.js
// ==============================


// ---------- ROUTE SELECTION ----------
const routeCards = document.querySelectorAll(".route-card");

routeCards.forEach(card => {

    card.addEventListener("click", () => {

        routeCards.forEach(otherCard => {
            otherCard.classList.remove("selected");
        });

        card.classList.add("selected");

        console.log("Selected route:", card.dataset.route);
    });

});


const startButton = document.getElementById("startAnalysis");

startButton.addEventListener("click", () => {

    const selectedRoute = document.querySelector(".route-card.selected");

    if (!selectedRoute) {
        alert("Please select a route first.");
        return;
    }

    const routeName = selectedRoute.dataset.route;

    console.log("Starting analysis:", routeName);

    window.location.href =
        `/dashboard?route=${encodeURIComponent(routeName)}`;
});