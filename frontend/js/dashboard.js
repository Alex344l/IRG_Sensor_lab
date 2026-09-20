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

    const routeData = longitude.map((lon, index) => ({
        x: lon,
        y: latitude[index]
    }));

    new Chart(routeGraph, {

        type: "scatter",

        data: {
            datasets: [{
                label: "Route",
                data: routeData,
                showLine: true,
                tension: 0.2,
                pointRadius: 0,
                borderWidth: 2
            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            scales: {

                x: {
                    title: {
                        display: true,
                        text: "Longitude"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Latitude"
                    }
                }
            },

            plugins: {

                legend: {
                    display: false
                }
            }
        }
    });
}




loadDashboard();