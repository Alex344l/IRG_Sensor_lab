import numpy as np
import pandas as pd




def clean_data(data):

    """
    Clean the data by removing rows with missing values.

    Parameters:
    data (pd.DataFrame): The DataFrame to clean.

    Returns:
    pd.DataFrame: The cleaned DataFrame.
    """

    data = data.dropna()
    data = data.drop_duplicates()


    for column in data.columns:

        if data[column].dtype == 'object':
            data[column] = data[column].str.strip()
            data[column] = data[column].astype("category")

        elif data[column].dtype in ['int64', 'float64']:
            data[column] = data[column].fillna(data[column].median())

        else:
            pass

    data = data.dropna()
    data = data.reset_index(drop=True)

    return data






#calculate distance
def find_distance(coords):

    radius = 5939

    coord_rad = np.radians(coords)

    lat = coord_rad[:, 0]
    lon = coord_rad[:, 1]

    lat_diff = np.diff(lat)
    lon_diff = np.diff(lon)

    a = np.sin(lat_diff / 2) ** 2 + np.cos(lat[:-1]) * np.cos(lat[1:]) * np.sin(lon_diff / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

    distance = radius * c
    return distance



#find heading in degrees
def find_heading(start, end):


    start = np.radians(start)
    end = np.radians(end)

    delta_lon = end[:, 1] - start[:, 1]

    x = np.cos(end[:, 0]) * np.sin(delta_lon)
    y = np.cos(start[:, 0]) * np.sin(end[:, 0]) - np.sin(start[:, 0]) * np.cos(end[:, 0]) * np.cos(delta_lon)

    b = np.arctan2(x, y)
    return np.degrees(b) % 360


def find_bearing(heading):

    results = []

    cardinals = {
        0: "N",
        360: "N",
        180: "S",
        90: "E",
        270: "W"
    }

    for h in heading:

        if h < 0 or h > 360:
            result = "ERROR: INVALID HEADING"
        elif h in [0, 90, 180, 360]:
            result = cardinals[h]
        else:
            if h < 90 or h > 270:
                point_1 = "N"

                if h < 90:
                    point_2 = "E"
                    value = h
                elif h > 270:
                    point_2 = "W"
                    value = 360 - h

            elif 90 < h < 270:
                point_1 = "S"

                if 90 < h < 180:
                    point_2 = "E"
                    value = 180 - h
                elif 180 < h < 270:
                    point_2 = "W"
                    value = h - 180

            value = np.round(value)
            result = point_1 + str(value) + point_2

        results.append(result)

    return results



def analyze_route(data):

    # -------------------------
    # Load and clean data
    # -------------------------

    data = clean_data(data)

    coordinates = data[["latitude", "longitude"]]
    coord_array = coordinates.to_numpy()

    # -------------------------
    # Time
    # -------------------------

    data["timestamp"] = pd.to_datetime(data["timestamp"])

    dt = (
        data["timestamp"]
        .diff()
        .dt.total_seconds()
        .fillna(0)
        .to_numpy()
    )

    # Convert seconds → minutes
    dt = dt / 60

    # Cumulative elapsed time
    elapsed_time = np.round(np.cumsum(dt), 2)

    # -------------------------
    # Distance
    # -------------------------

    position_1 = coord_array[:-1]
    position_end = coord_array[1:]

    distance = find_distance(coord_array)

    # -------------------------
    # Velocity
    # -------------------------

    # dt[0] belongs to the first GPS point and has no
    # corresponding distance, so remove it.
    interval_time = dt[1:]

    # Prevent division by zero
    safe_dt = np.where(interval_time == 0, np.nan, interval_time)

    velocity = distance / (safe_dt / 60)

    # Replace NaN / infinity with 0 so FastAPI can serialize it
    velocity = np.nan_to_num(
        velocity,
        nan=0.0,
        posinf=0.0,
        neginf=0.0
    )

    # -------------------------
    # Average speed
    # -------------------------

    total_distance = np.sum(distance)
    total_time_hours = np.sum(dt) / 60

    if total_time_hours > 0:
        average_speed = total_distance / total_time_hours
    else:
        average_speed = 0

    # -------------------------
    # Heading
    # -------------------------

    heading = find_heading(
        position_1,
        position_end
    )

    # -------------------------
    # Bearing
    # -------------------------

    bearing = find_bearing(heading)

    # Most common bearing
    most_common_bearing = pd.Series(bearing).mode()[0]

    # ----------------------------
    # Elevation
    # -----------------------------

    elevation = data["elevation_m"].to_numpy()


    # -------------------------
    # Return results
    # -------------------------

    return {
        "total_time": float(elapsed_time[-1]),
        "distance": float(total_distance),
        "average_speed": float(average_speed),
        "bearing": str(most_common_bearing),

        "speed_overtime": {
            "velocity": velocity.tolist(),
            "time": elapsed_time[1:].tolist()
        },
        "elevation_analysis":{
            "elevation": elevation[1:].tolist(),
            "elapsed_distance": np.cumsum(distance).round(2).tolist()
        },
        "route": {
            "latitude": coord_array[0].tolist(),
            "longitude": coord_array[1].tolist()
        }
    }



  

