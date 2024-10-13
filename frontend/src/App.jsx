import React, { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./components/Map";
import LocationSearchPanel from "./components/LocationSearchPanel";
import "./App.scss";

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelection = async (placeResult) => {
    try {

      if (placeResult) {
        setSelectedPlace({
          name: placeResult.name,
          address: placeResult.formatted_address,
          latitude: placeResult.geometry?.location?.lat(),
          longitude: placeResult.geometry?.location?.lng(),
        });
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div className="app">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <div className="location-panel">
          <LocationSearchPanel onPlaceSelect={handlePlaceSelection} />
        </div>
        <Map place={selectedPlace} />
      </APIProvider>
    </div>
  );
};

export default App;
