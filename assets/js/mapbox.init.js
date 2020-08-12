mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uY2VsaXMiLCJhIjoiY2tkcnBjZHRvMHMxcDJ4cGJ1Zm8xNGQ5NSJ9.y9K3zBTnDxgUK49q8WhPIA';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
	center: [-75.565804,6.300195], // starting position
    zoom: 13 // starting zoom
});
		
// create the popup
let popup = new mapboxgl.Popup({ offset: 40 }).setText(
    'Medellín, Antioquia'
);

// create DOM element for the marker
let el = document.createElement('div');
el.id = 'marker';
 
// create the marker
new mapboxgl.Marker(el)
    .setLngLat([-75.565804,6.300195])
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);

// Add zoom and rotation controls to the map.
//map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

map.scrollZoom.disable();
map.dragPan.disable();