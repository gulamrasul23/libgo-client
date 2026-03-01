import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const Map = ({ centers }) => {
  const position = [23.685, 90.356];

  const [zoom] = useState(window.innerWidth < 640 ? 7 : 8);

  return (
    <div className="h-[420px] w-full lg:w-2/3 relative z-10 rounded-3xl overflow-hidden shadow-inner border border-base-300">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-[420px] w-full rounded-3xl overflow-hidden shadow-inner border border-base-300"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centers.map((center, index) => (
          <Marker
            key={index}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
            }}
            position={[center.latitude, center.longitude]}
          >
            <Popup>
              <strong>{center.district}</strong> <br /> Covered Areas:{" "}
              {center.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
