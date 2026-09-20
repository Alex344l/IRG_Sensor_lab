const params = new URLSearchParams(window.location.search);
const route = params.get("route");


async function loadDashboard() {

    const response = await fetch("/api/analyze", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            route: route
        })
    });

    const result = await response.json();


    console.log("FULL RESULT:", result);
    console.log("Distance:", result.distance);
    console.log("Total time:", result.total_time);
    console.log("Average speed:", result.average_speed);
    console.log("Bearing:", result.bearing);
    console.log("Speed data:", result.speed_overtime);
    console.log("Elevation over time:", result.elevation_analysis);


    // -------------------------
    // Dashboard metrics
    // -------------------------

    document.getElementById("routeName").textContent = route;

    document.getElementById("distance").textContent =
        result.distance.toFixed(2);

    document.getElementById("totalTime").textContent =
        result.total_time.toFixed(2);

    document.getElementById("averageSpeed").textContent =
        result.average_speed.toFixed(2);

    document.getElementById("bearing").textContent =
        result.bearing;


    // -------------------------
    // Speed graph
    // -------------------------

    const time = result.speed_overtime.time;
    const velocity = result.speed_overtime.velocity;

    const velocity_graph = document.getElementById("speedChart");

    new Chart(velocity_graph, {

        type: "line",

        data: {
            labels: time,

            datasets: [{
                label: "Speed",
                data: velocity,

                tension: 0.3,
                borderWidth: 2,
                pointRadius: 0
            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            scales: {

                x: {
                    title: {
                        display: true,
                        text: "Time (minutes)"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Speed (mph)"
                    },

                    beginAtZero: true
                }
            },

            plugins: {

                legend: {
                    display: false
                }
            }
        }
    });

    const elevation = result.elevation_analysis.elevation;
    const elapsed_distance = result.elevation_analysis.elapsed_distance

    const elevation_graph = document.getElementById("elevationChart")

    new Chart(elevation_graph, {

        type: "line",

            data: {
                labels: elapsed_distance,

                datasets: [{
                    label: "Elevation",
                    data: elevation,

                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            scales: {

                x: {
                    title: {
                        display: true,
                        text: "Distance (miles)"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Elevation (meters)"
                    },

                    beginAtZero: false
                }
            },

            plugins: {

                legend: {
                    display: false
                }
            }
        }
    });

    const latitude = result.route.latitude;
const longitude = result.route.longitude;

const routeGraph = document.getElementById("routeMapGraph");

// ------------------------------------
// Convert GPS coordinates to meters
// relative to the starting point
// ------------------------------------

const startLat = latitude[0];
const startLon = longitude[0];

const earthRadius = 6371000;

const routeData = latitude.map((lat, index) => {

    const lon = longitude[index];

    const x =
        (lon - startLon) *
        Math.cos(startLat * Math.PI / 180) *
        (Math.PI / 180) *
        earthRadius;

    const y =
        (lat - startLat) *
        (Math.PI / 180) *
        earthRadius;

    return {
        x: x,
        y: y
    };
});

// ------------------------------------
// Start and finish points
// ------------------------------------

const startPoint = routeData[0];
const finishPoint = routeData[routeData.length - 1];

// ------------------------------------
// Route chart
// ------------------------------------

new Chart(routeGraph, {

    type: "scatter",

    data: {

        datasets: [

            // Main route
            {
                label: "Route",

                data: routeData,

                showLine: true,

                tension: 0.15,

                pointRadius: 0,

                borderWidth: 3
            },

            // Start
            {
                label: "Start",

                data: [startPoint],

                pointRadius: 7,

                pointHoverRadius: 9,

                showLine: false,

                borderWidth: 2
            },

            // Finish
            {
                label: "Finish",

                data: [finishPoint],

                pointRadius: 7,

                pointHoverRadius: 9,

                showLine: false,

                borderWidth: 2
            }
        ]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            mode: "nearest",
            intersect: false
        },

        scales: {

            x: {
                title: {
                    display: true,
                    text: "East / West (meters)"
                },

                grid: {
                    display: true
                }
            },

            y: {
                title: {
                    display: true,
                    text: "North / South (meters)"
                },

                grid: {
                    display: true
                }
            }
        },

        plugins: {

            legend: {
                display: true
            },

            tooltip: {

                callbacks: {

                    label: function(context) {

                        const x = context.parsed.x;
                        const y = context.parsed.y;

                        return `X: ${x.toFixed(1)} m, Y: ${y.toFixed(1)} m`;
                    }
                }
            }
        }
    }
});
}




loadDashboard();