import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";  

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Varsayılan konum (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

// Google Maps için gerekli kütüphaneleri tanımladık
const libraries = ["places"];

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const inputRef = useRef(null);

  // Kullanıcının konumunu al
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("Konum alınamadı, varsayılan konum kullanılıyor.");
          setUserLocation(defaultCenter);
        }
      );
    } else {
      console.log("Tarayıcı konum servisini desteklemiyor.");
      setUserLocation(defaultCenter);
    }
  }, []);

  // Google API tamamen yüklenene kadar bekle
  const handleScriptLoad = () => {
    setIsApiLoaded(true);
  };

  // Google Places Autocomplete işlemleri
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        setSearchLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.warn("Geçersiz yer seçildi.");
      }
    } else {
      console.error("Autocomplete yüklenmedi!");
    }
  };

  return (
    <div className="relative">
      <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} 
        libraries={libraries} 
        onLoad={handleScriptLoad} 
      >
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation || defaultCenter} zoom={12}>
          {userLocation && <Marker position={userLocation} label="Siz" />}
          {searchLocation && <Marker position={searchLocation} label="Seçilen Yer" />}
        </GoogleMap>
      </LoadScript>

      {/* Arama kutusu */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        {isApiLoaded && (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input type="text" placeholder="Yer arayın..." className="px-4 py-2 rounded-lg shadow-lg text-gray-700" />
          </Autocomplete>
        )}
      </div>
    </div>
  );
};

export default MapPage;
