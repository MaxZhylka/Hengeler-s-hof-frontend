"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLng } from "leaflet";

import { Contacts } from "@/entities/model/contacts";

function LocationMarker({ contacts }: { contacts: Contacts }) {
  const markerPosition = new LatLng(47.7747, 10.2375995);
  return (
    <Marker position={markerPosition} interactive={true}>
      <Popup>
        <div className="flex flex-col gap-[12px] items-center">
          <h2 className="text-[24px] font-bold">Hengeler&apos;s Hof</h2>
          <img src="/images/cow.png" alt="map" className="w-[100px] h-[100px]" />
          <p className="text-[14px] !m-0">
            {contacts.street}, {contacts.postalCode} {contacts.city},{" "}
            {contacts.country}
          </p>
        </div>
      </Popup>
      <Tooltip direction="bottom" offset={[-15, 35]} permanent>
        <div className="text-sm font-medium text-black">
          {contacts.street}, {contacts.postalCode} {contacts.city},{" "}
          {contacts.country}
        </div>
      </Tooltip>
    </Marker>
  );
}
const LeafletMap = ({
  zoomControl = true,
  height = "400px",
  scrollWheelZoom = false,
  contacts,
}: {
  zoomControl?: boolean;
  height?: string;
  scrollWheelZoom?: boolean;
  contacts: Contacts;
}) => {
  return (
    <div>
      <MapContainer
        center={[47.7747, 10.2375995]}
        zoom={15}
        zoomControl={zoomControl}
        scrollWheelZoom={scrollWheelZoom}
        style={{
          height: height,
          width: "100%",
          borderRadius: "8px",
          zIndex: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker contacts={contacts} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
