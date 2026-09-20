# Sensor Lab

Sensor Lab is a full-stack sensor and route analysis project built with **Python, FastAPI, JavaScript, and data visualization tools**.

The project is designed to experiment with processing GPS and sensor-related data through a Python backend and presenting the results through an interactive web dashboard.

## Current Features

The current version focuses on analyzing predefined running routes.

### Route Selection

Users can select a route from the available route dataset and start an analysis.

Each route contains GPS-based data such as:

- Latitude
- Longitude
- Elevation
- Timestamp

### GPS Route Analysis

The Python backend processes the route data and calculates:

- Total distance
- Total elapsed time
- Average speed
- Movement speed over time
- Travel bearing
- Route coordinates
- Elevation changes

### Route Visualization

The dashboard visualizes the selected route using its latitude and longitude coordinates.

### Speed Analysis

Speed is calculated between consecutive GPS points and displayed as a graph showing how speed changes throughout the run.

### Elevation Analysis

Elevation is displayed relative to distance traveled, allowing the terrain profile of the route to be viewed throughout the run.

### Dashboard

The project includes a web dashboard displaying the analyzed data through:

- Distance metrics
- Time metrics
- Average speed
- Bearing
- Speed graph
- Route visualization
- Elevation graph

## Technology Stack

### Backend

- Python
- FastAPI
- Uvicorn
- Pandas
- NumPy

### Frontend

- HTML
- CSS
- JavaScript
- Chart.js

### Data

Currently, route data is stored using CSV files.

Each route contains timestamped GPS and elevation data.

## Project Structure

```text
Sensor_lab/
│
├── backend/
│   ├── main.py
│   └── nav.py
│
├── frontend/
│   ├── index.html
│   ├── about.html
│   ├── tests.html
│   ├── dashboard.html
│   │
│   ├── css/
│   │   ├── index.css
│   │   ├── about.css
│   │   ├── tests.css
│   │   └── dashboard.css
│   │
│   └── js/
│       ├── index.js
│       ├── tests.js
│       └── dashboard.js
│
├── sensor_data/
│   └── route_*.csv
│
└── README.md
```

## How It Works

The current data flow is:

```text
User
 │
 ▼
Route Selection
 │
 ▼
FastAPI
 │
 ▼
CSV Route Data
 │
 ▼
Python Analysis
 │
 ├── Distance
 ├── Speed
 ├── Bearing
 └── Elevation
 │
 ▼
JSON Response
 │
 ▼
JavaScript Dashboard
 │
 ▼
Charts & Metrics
```

## Running the Project

Clone the repository and navigate into the project:

```bash
git clone <repository-url>
cd Sensor_lab
```

Create and activate a Python virtual environment:

```bash
python3 -m venv myenv
source myenv/bin/activate
```

Install the required packages:

```bash
pip install fastapi uvicorn pandas numpy
```

Start the development server:

```bash
uvicorn backend.main:app --reload
```

Then open the application in your browser:

```text
http://127.0.0.1:8000
```

## Goals

Sensor Lab is being developed as a learning and experimentation project, with the goal of gradually moving from simulated/predefined route data toward more realistic sensor-driven analysis.

### Short-Term Goals

- Add more routes
- Improve route selection
- Add additional running metrics
- Improve dashboard visualizations
- Improve route visualization
- Add better route metadata
- Improve data validation and error handling
- Experiment with more advanced statistical analysis

### Medium-Term Goals

- Move route storage from CSV files to a database
- Add route history
- Compare multiple runs and routes
- Add more detailed GPS analysis
- Incorporate additional sensor data
- Experiment with SciPy for more advanced data processing
- Improve the frontend and overall dashboard experience

### Long-Term Goals

The larger goal is to use the concepts developed in Sensor Lab as a foundation for a more advanced running/sensor system involving real-world hardware.

Potential future areas include:

- Real-time GPS data
- Gyroscope and IMU data
- Sensor fusion
- Real-time speed and movement analysis
- Navigation and directional information
- Weather data
- Run recording
- More advanced visualization
- Hardware-based data collection

The long-term project may eventually explore how these capabilities could be integrated into a mixed-reality running experience.

## Project Status

**Current version: v0.1 — Basic Route Analysis**

The first version is intentionally focused on getting the core pipeline working:

```text
Data → Python Analysis → FastAPI → JavaScript → Dashboard
```

Future versions will build on this foundation rather than trying to implement the entire system at once.

## Why This Project?

Sensor Lab is primarily a learning and experimentation project.

It provides practical experience with:

- Full-stack development
- Python data processing
- REST APIs
- GPS mathematics
- Numerical computing
- Data visualization
- Frontend/backend communication
- Sensor data concepts
- Software architecture

The project will gradually become more complex as new technologies and analysis techniques are introduced.