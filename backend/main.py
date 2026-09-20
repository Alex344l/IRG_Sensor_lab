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
    "Lakeside Run": "data/route_1_lakeside.csv",
    "Riverside Run": "data/route_2_riverside.csv",
    "Neighborhood Run": "data/route_3_neighborhood.csv",
    "Park Loop": "data/route_4_park_loop.csv",
    "Long Loop": "data/route_5_long_loop.csv"
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