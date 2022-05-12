import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

interface Props {
    sizewidth: string;
    sizeheight: string;
    onClickMap: (lat: number, lng: number) => void;
    popup: string;
}

const MapLeaflet = (props: Props) => {

    const { sizeheight, sizewidth, onClickMap, popup } = props;

    return (
        <Container className={'rounded'}>
            
            {/* UAGRM DIRECCION  */}

            <MapContainer
                center={[-17.775298770056597, -63.19580322475146]} zoom={15}
                style={{ width: sizewidth, height: sizeheight }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onClickMap={onClickMap} popup={popup} />
            </MapContainer>

        </Container>
    )
}

interface PropsMarker {
    popup: string;
    onClickMap: (lat: number, lng: number) => void;
}

type Position = {
    lat: number;
    lng: number;
}

const LocationMarker = (props: PropsMarker) => {

    const { onClickMap, popup } = props;
    const [marker, setmarker] = useState<Position | null>(null);

    const map = useMapEvents({
        click(e) {
            setmarker({
                lng: e.latlng.lng,
                lat: e.latlng.lat,
            });
            onClickMap(e.latlng.lat, e.latlng.lng);
        }
    })

    if (marker === null) return null;

    return (
        <Marker position={[marker.lat, marker.lng]}>
            <Popup>
                {popup}
            </Popup>
        </Marker>
    )
}

export default MapLeaflet