import { useEffect } from 'react';

const CustomMarker = ({ map, position }) => {
  useEffect(() => {
    const { AdvancedMarkerElement } = google.maps.marker;
    
    const marker = new AdvancedMarkerElement({
      map,
      position,
      title: 'Localização'
    });
    
    return () => marker.setMap(null);
  }, [map, position]);
  
  return null;
}; 