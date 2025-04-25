import { GoogleMap } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

// Adicione estas configurações
const mapContainerStyle = {
  width: '100%',
  height: '100vh'
};

const defaultCenter = {
  lat: -23.550520, // Ajuste para sua localização padrão
  lng: -46.633308
};

function Home() {
  const [_driverLocation, setDriverLocation] = useState(null);
  const [_showNotification, setShowNotification] = useState(false);
  const [_showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    if (origin && destination) {
      calculateRoute();
    }
  }, [origin, destination, calculateRoute]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={15}
      >
        {/* Seus marcadores e componentes do mapa aqui */}
      </GoogleMap>
    </LoadScript>
  );
}

export default Home; 