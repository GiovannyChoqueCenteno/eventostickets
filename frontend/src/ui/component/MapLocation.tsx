import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'

interface Props {
    lat: string;
    lng: string;
    popup: string;
}
const MapLocation = (props: Props) => {

    const { lat, lng, popup } = props;

    return (
        <Container className={'rounded'} >
            <MapContainer
                center={[Number(lat), Number(lng)]} zoom={15}
                style={{ width: "100%", height: 300 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[Number(lat), Number(lng)]}>
                    <Popup>
                        {popup}
                    </Popup>
                </Marker>
            </MapContainer>
        </Container>
    )
}

export default MapLocation