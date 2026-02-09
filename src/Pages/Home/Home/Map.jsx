import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ centers }) => {
  const position = [23.685, 90.356];


  return (
   
            <div className="h-[420px] w-full lg:w-2/3 relative z-10 rounded-3xl overflow-hidden shadow-inner border border-base-300">
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
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
            <Popup><strong>{center.district}</strong> <br /> Covered Areas:  {center.covered_area.join(", ")}</Popup>
          </Marker>
        ))}
      </MapContainer>
       </div>
  );
};

export default Map;
