import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "./Map.css"
mapboxgl.accessToken = 'pk.eyJ1IjoicmV6YS1wcmF5b2dhIiwiYSI6ImNrNzNqcHIwdjA5ZnMzZXBmOWZqbjdkcDAifQ.CFInsp80lt2qWYSqLoJRcg'

const Map = ({ center, zoom, className, style, title, address, langitude, latitude }) => {
    const mapRef = useRef()
   // const [state, setState] = useState({lng: null, lat: null, zoom: null })
    
    useEffect(()=>{
   
        //let center =  { lng:state.lng, lat: state.lat}

        const map = new mapboxgl.Map({
                container: mapRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center:  center,
                zoom:    zoom
        });

        new mapboxgl.Marker()
                   .setLngLat(center).setPopup(new mapboxgl.Popup({ offset: 22 }) // add popups
                   .setHTML(`<h3>${title} </h3><p> ${address} </p><code>lng: ${langitude}</code><br/><code>lat: ${latitude}</code>`))
                   .addTo(map);
        
       /*   map.on('move', () => {
          setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        }); */  
        console.log("Map Mount")
    },[center, zoom, title, address, langitude, latitude])

    return (
        <div ref={mapRef}
             className={`map ${className} `}
             style={style}>
        </div>
        )

}
 
export default Map;