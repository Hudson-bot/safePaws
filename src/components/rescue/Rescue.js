import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

const center = { lat: 21.1458, lng: 79.0882 };

const Rescue = ({ handleCloseForm }) => {
  const GOOGLE_MAPS_API_KEY = "AlzaSyqcqHYuc5-lvm4BoU1NbgItE0HIxJ5SgTz";
  const addressRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    animalType: "",
    injuryType: "",
    address: "",
    photo: null,
    selectedLocation: null,
  });
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);

  // Load Google Maps Script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
        window.initMap = () => {}; // Define initMap to avoid errors
      };
      document.body.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  // Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userLocation);
        },
        (error) => {
          console.error("Geolocation permission denied or unavailable.", error);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          setFormData({
            ...formData,
            selectedLocation: { lat, lng },
            address: results[0].formatted_address,
          });
        } else {
          console.error("Geocode failed: " + status);
        }
      });
    }

    setShowMap(false);
  };

  const handlePlaceSelect = () => {
    if (addressRef.current && addressRef.current.getPlace) {
      const place = addressRef.current.getPlace();
      if (place && place.formatted_address) {
        setFormData({ ...formData, address: place.formatted_address });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <button onClick={handleCloseForm} className="absolute top-2 right-2 text-xl text-gray-600">×</button>
        <h2 className="text-2xl text-center mb-4">Rescue Form</h2>
        <form>
          <label className="block mb-2">Full Name:</label>
          <input type="text" name="fullName" className="w-full p-2 mb-4 border border-gray-300 rounded" required onChange={handleChange} />
          
          <label className="block mb-2">Type of Animal:</label>
          <input type="text" name="animalType" className="w-full p-2 mb-4 border border-gray-300 rounded" required onChange={handleChange} />

          <label className="block mb-2">Injury Type:</label>
          <input type="text" name="injuryType" className="w-full p-2 mb-4 border border-gray-300 rounded" required onChange={handleChange} />

          <label className="block mb-2">Address:</label>
          {mapLoaded && (
            <Autocomplete onLoad={(ref) => (addressRef.current = ref)} onPlaceChanged={handlePlaceSelect}>
              <input type="text" name="address" className="w-full p-2 mb-4 border border-gray-300 rounded" required value={formData.address} onChange={handleChange} />
            </Autocomplete>
          )}
          
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4" onClick={() => setShowMap(true)}>Choose Location on Map</button>
          
          <label className="block mb-2">Photo:</label>
          <input type="file" className="w-full p-2 mb-4 border border-gray-300 rounded" accept="image/*" required onChange={handleFileChange} />

          <div className="flex justify-center">
            <button type="submit" className="bg-orange-700 text-white px-8 py-3 rounded-lg">Submit</button>
          </div>
        </form>
      </div>

      {showMap && mapLoaded && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 h-4/5 relative">
            <button onClick={() => setShowMap(false)} className="absolute top-2 right-2 text-xl text-gray-600">×</button>
            <h3 className="text-lg text-center mb-4">Select a Location</h3>
            <div style={{ width: "100%", height: "80%" }}>
              <GoogleMap center={mapCenter} zoom={14} mapContainerStyle={{ width: "100%", height: "100%" }} onClick={handleMapClick}>
                {formData.selectedLocation && <Marker position={formData.selectedLocation} />}
              </GoogleMap>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rescue;
