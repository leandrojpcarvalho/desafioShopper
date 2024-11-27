import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Poi } from "../types";
import './style.css'

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;


export interface MapProps {
    locations: Poi[];
}

export default function MapGenerator({ locations }: MapProps) {
    return (
        <div className="map-container">
            <APIProvider apiKey={API_KEY} >
                <Map
                    className="map"
                    defaultCenter={calculateMiddlePoint(locations)}
                    defaultZoom={calculateZoom(calculateMiddlePoint(locations))}
                    mapId={"DEMO_MAP_ID"}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}

                >
                    <PoiMarkers pois={locations} />
                </Map>

            </APIProvider>
        </div>
    )
}

const PoiMarkers = (props: { pois: Poi[] }) => {
    return (
        <>
            {props.pois.map(poi => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                >
                    <Pin background={poi.background} glyphColor={'#000'} borderColor={'#000'} key={poi.key} />
                </AdvancedMarker>
            ))}
        </>
    )
}

const calculateMiddlePoint = (locations: Poi[]) => {
    let lat = 0;
    let lng = 0;
    locations.forEach(location => {
        lat += location.location.lat;
        lng += location.location.lng;
    })
    return { lat: lat / locations.length, lng: lng / locations.length }
}

const calculateZoom = (locations: google.maps.LatLngLiteral) => {
    return Math.abs((locations.lat + locations.lng) / 3.5);
}