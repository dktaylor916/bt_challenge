// Initialize Map
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [0, 0],
  zoom: 2,
  accessToken:
    "pk.eyJ1IjoiZGt0YXlidyIsImEiOiJjbDlkenBvODMwa2twM3hvZ293bWVpaml1In0._QB63ZC3km-uev6mJkmacg",
});

// Add Slider Event Listener
const slider = document.getElementById("slider");
slider.addEventListener("input", updateMap);

// Data
const data = {
  column1: [
    { lat: 40.7128, lng: -74.006, value: 10 },
    { lat: 34.0522, lng: -118.2437, value: 20 },
    { lat: 51.5074, lng: -0.1278, value: 30 },
  ],
  column2: [
    { lat: 40.7128, lng: -74.006, value: 40 },
    { lat: 34.0522, lng: -118.2437, value: 50 },
    { lat: 51.5074, lng: -0.1278, value: 60 },
  ],
  column3: [
    { lat: 40.7128, lng: -74.006, value: 70 },
    { lat: 34.0522, lng: -118.2437, value: 80 },
    { lat: 51.5074, lng: -0.1278, value: 90 },
  ],
};

// Update Map
function updateMap() {
  const selectedColumn = "column" + slider.value;

  // Clear Map
  map.getSource("points").setData({ type: "FeatureCollection", features: [] });

  // Add New Data to Map
  data[selectedColumn].forEach((feature) => {
    const { lat, lng, value } = feature;
    const newFeature = {
      type: "Feature",
      geometry: { type: "Point", coordinates: [lng, lat] },
      properties: { value },
    };
    map.getSource("points").setData(newFeature);
  });
}

// Wait for Map to Load
map.on("load", function () {
  // Add Data Source
  map.addSource("points", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  // Add Layer
  map.addLayer({
    id: "points-layer",
    type: "circle",
    source: "points",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "value"],
        0,
        2,
        100,
        10,
      ],
      "circle-color": "#FF0000",
    },
  });

  // Set Initial Map Data
  updateMap();
});
