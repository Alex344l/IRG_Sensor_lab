from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd

from backend.nav import analyze_route


app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")

@app.get("/")
def home():
    return FileResponse("frontend/index.html")

@app.get("/tests")
def test():
    return FileResponse("frontend/tests.html")

@app.get("/about")
def about():
    return FileResponse("frontend/about.html")



# ---------- ROUTE REQUEST ----------

class RouteRequest(BaseModel):
    route: str


# ---------- ROUTE DATA ----------

routes = {
    "Lakeside Run": "sensor_data/route_1_lakeside.csv",
    "Riverside Run": "sensor_data/route_2_riverside.csv",
    "Neighborhood Run": "sensor_data/route_3_neighborhood.csv",
    "Park Loop": "sensor_data/route_4_park_loop.csv",
    "Long Loop": "sensor_data/route_5_long_loop.csv",
    "Hilltop Run": "sensor_data/route_6_hilltop_run.csv",
    "Forest Trail": "sensor_data/route_7_forest_trail.csv",
    "Creekside Run": "sensor_data/route_8_creekside_run.csv",
    "Campus Loop": "sensor_data/route_9_campus_loop.csv",
    "Reservoir Run": "sensor_data/route_10_reservoir_run.csv",
    "Downtown Loop": "sensor_data/route_11_downtown_loop.csv",
    "Meadow Run": "sensor_data/route_12_meadow_run.csv",
    "Mountain View": "sensor_data/route_13_mountain_view.csv",
    "Lakeshore Loop": "sensor_data/route_14_lakeshore_loop.csv",
    "Long Trail": "sensor_data/route_15_long_trail.csv"
}


# ---------- ANALYZE ROUTE ----------

@app.post("/api/analyze")
def analyze(data: RouteRequest):

    file = routes[data.route]

    df = pd.read_csv(file)

    results = analyze_route(df)

    return results

@app.get("/dashboard")
def dashboard():
    return FileResponse("frontend/dashboard.html")