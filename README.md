# IRG_Sensor_lab
# 🧪 Sensor Lab

A full-stack sensor data analysis and visualization project built while learning **web development, Python, scientific computing, and eventually physical sensor integration**.

The project starts as a simple web application where users can enter sensor data and have a Python backend process it. As I learn new technologies and concepts, I plan to expand the project with data visualization, signal processing, real-time data, databases, and eventually physical sensors.

> **This is both a learning project and a practical foundation for a future running/sensor system.**

---

## 🚀 Project Goals

The main goal of Sensor Lab is to learn full-stack development by building something that can progressively become more complex.

Instead of following a fixed feature list, new features will be added as I learn new technologies and discover useful applications for them.

Some areas I plan to explore:

* 🌐 Full-stack web development
* 🐍 Python backend development
* 📡 Sensor data processing
* 📍 GPS and coordinate systems
* 📊 Data visualization
* 📈 Time-series analysis
* 🧮 Scientific computing
* ⚡ Real-time data processing
* 💾 Databases
* 🔌 Physical sensor integration
* 🧠 Sensor fusion and potentially machine learning

---

## 🏗️ Planned Architecture

The project will gradually evolve toward an architecture similar to:

```text
┌──────────────────────────┐
│         Frontend         │
│                          │
│ HTML + CSS + JavaScript  │
└────────────┬─────────────┘
             │
             │ HTTP / JSON
             ▼
┌──────────────────────────┐
│         Backend          │
│                          │
│ Python + FastAPI         │
│                          │
│ Calculations             │
│ Data Processing          │
│ Validation               │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      Data / Storage      │
│                          │
│ CSV / JSON → SQLite      │
│             → PostgreSQL │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    Future Sensor Layer   │
│                          │
│ GPS • Gyroscope • IMU    │
│ Raspberry Pi / Hardware  │
└──────────────────────────┘
```

The architecture will change as the project develops.

---

## 🛠️ Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* FastAPI
* Uvicorn

### Data & Scientific Computing

* NumPy
* Pandas
* SciPy
* Matplotlib

### Planned / Possible

* Charting library for browser visualization
* SQLite
* PostgreSQL
* WebSockets
* scikit-learn
* OpenCV
* PyTorch

Not every technology listed above will necessarily become part of the final application. They will be added when they provide a useful purpose.

---

# 📍 Current Focus

The initial version is focused on learning the basic full-stack data pipeline:

```text
User Input
    ↓
JavaScript
    ↓
HTTP Request
    ↓
FastAPI
    ↓
Python
    ↓
Calculation
    ↓
JSON Response
    ↓
JavaScript
    ↓
Webpage
```

The first major feature will be a **GPS/sensor calculation tool**.

Potential calculations include:

* Distance between coordinates
* Speed
* Average speed
* Bearing
* Elevation change
* 3D distance
* Basic sensor statistics

---

# 🗺️ Development Roadmap

The roadmap is intentionally flexible.

### Phase 1 — Full-Stack Fundamentals

* [ ] Create frontend
* [ ] Create FastAPI backend
* [ ] Connect JavaScript to Python
* [ ] Send and receive JSON
* [ ] Create first API endpoint
* [ ] Learn basic API validation

### Phase 2 — GPS & Sensor Calculations

* [ ] Latitude/longitude handling
* [ ] Coordinate conversions
* [ ] Haversine distance
* [ ] Bearing calculations
* [ ] Speed calculations
* [ ] Elevation change
* [ ] 3D distance
* [ ] Unit conversions

### Phase 3 — Data Visualization

* [ ] Build dashboard
* [ ] GPS path visualization
* [ ] Speed graphs
* [ ] Elevation graphs
* [ ] Sensor graphs
* [ ] Interactive frontend visualizations

### Phase 4 — Data Processing

* [ ] CSV upload
* [ ] Process multiple GPS points
* [ ] Time-series analysis
* [ ] Detect invalid measurements
* [ ] Handle GPS noise
* [ ] Experiment with SciPy filtering

### Phase 5 — Data Storage

* [ ] Introduce SQLite
* [ ] Store runs
* [ ] Store sensor measurements
* [ ] Store calculated statistics
* [ ] Learn SQL
* [ ] Explore PostgreSQL

### Phase 6 — Real-Time Data

* [ ] Create sensor simulator
* [ ] Stream simulated sensor data
* [ ] Learn WebSockets
* [ ] Create live dashboard
* [ ] Process data in real time

### Phase 7 — Physical Hardware

* [ ] Connect GPS
* [ ] Connect gyroscope/IMU
* [ ] Collect real sensor data
* [ ] Send data to backend
* [ ] Visualize real sensor data
* [ ] Compare simulated vs. real measurements

### Phase 8 — Advanced Experiments

Possible future areas:

* Sensor fusion
* Signal processing
* Anomaly detection
* Machine learning
* Computer vision
* More advanced navigation calculations

---

# 🧠 Learning Philosophy

This project is being developed alongside my learning rather than after completing it.

For example:

```text
Learn NumPy
     ↓
Practice NumPy separately
     ↓
Find something useful for Sensor Lab
     ↓
Integrate it
```

The same approach will be used for technologies such as:

```text
Pandas
SciPy
JavaScript
FastAPI
SQL
WebSockets
Machine Learning
```

The goal is not to use as many technologies as possible.

**A technology should be added because it solves a problem or provides a useful learning opportunity.**

---

# 📂 Project Structure

The structure will evolve, but the initial organization is planned to look roughly like:

```text
sensor-lab/
│
├── backend/
│   ├── main.py
│   ├── api/
│   ├── calculations/
│   └── models/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── data/
│   ├── sample/
│   └── generated/
│
├── tests/
│
├── .gitignore
├── README.md
└── requirements.txt
```

This structure is expected to change as the application grows.

---

# 🔬 Why Sensor Data?

Sensor data provides a useful way to combine multiple areas of programming and computer science.

For example:

```text
GPS
 ↓
Coordinates
 ↓
Mathematics
 ↓
Distance / Speed / Bearing
 ↓
Python
 ↓
API
 ↓
JavaScript
 ↓
Visualization
```

Later:

```text
Physical Sensor
 ↓
Raw Data
 ↓
Signal Processing
 ↓
Python
 ↓
API / WebSocket
 ↓
Web Dashboard
```

This makes the project useful for practicing both software development and scientific/data-oriented programming.

---

# 📚 Current Learning Areas

This project is being developed while learning:

* Python
* NumPy
* Pandas
* SciPy
* Matplotlib
* JavaScript
* HTML
* CSS
* FastAPI
* REST APIs
* JSON
* Git/GitHub
* SQL
* Data visualization
* Sensor processing

More technologies will be added as the project develops.

---

# ⚠️ Project Status

**🚧 Early Development**

This project is primarily a learning and experimentation project.

Features, architecture, technologies, and project structure may change significantly during development.

---

# 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.
