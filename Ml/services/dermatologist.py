import requests

def get_dermatologists(lat, lon):
    url = "https://overpass-api.de/api/interpreter"

    query = f"""
    [out:json];
    node
      ["healthcare"="doctor"]
      ["speciality"="dermatology"]
      (around:5000,{lat},{lon});
    out;
    """

    response = requests.get(url, params={"data": query})
    data = response.json()

    results = []

    for place in data.get("elements", [])[:5]:
        results.append({
            "name": place.get("tags", {}).get("name", "Unknown"),
            "address": place.get("tags", {}).get("addr:full", "Address not available"),
            "lat": place.get("lat"),
            "lon": place.get("lon")
        })

    return results