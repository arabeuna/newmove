import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    // Verificar se a chave está definida
    if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
      console.error('Chave da API do Google Maps não encontrada');
    }
  }, []);

  const handleLoadError = (error) => {
    console.error('Erro ao carregar Google Maps:', error);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: -23.550520,
    lng: -46.633308
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      onError={handleLoadError}
      libraries={['places', 'geometry', 'drawing']}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        {/* Seus marcadores e outros componentes aqui */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map; 