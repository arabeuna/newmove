import { useEffect } from 'react';

const PlacesAutocomplete = () => {
  useEffect(() => {
    const loadPlaces = async () => {
      const { PlaceAutocompleteElement } = await google.maps.importLibrary("places");
      
      const autocomplete = new PlaceAutocompleteElement({
        container: document.getElementById('autocomplete-container'),
        fields: ['formatted_address', 'geometry', 'name']
      });
      
      // ... resto do código
    };
    
    loadPlaces();
  }, []);
  
  return (
    <div id="autocomplete-container"></div>
  );
}; 