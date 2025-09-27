import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Heart, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Donor } from "@shared/schema";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom donor marker icon
const donorIcon = L.divIcon({
  className: "custom-donor-marker",
  html: `
    <div style="
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    ">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Selected donor marker icon
const selectedDonorIcon = L.divIcon({
  className: "custom-donor-marker-selected",
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid white;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      animation: pulse 2s infinite;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    </style>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// User location marker icon
const userLocationIcon = L.divIcon({
  className: "custom-user-marker",
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    ">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

interface InteractiveMapProps {
  center: [number, number];
  donors: (Donor & { distance: number })[];
  onDonorSelect: (donor: Donor) => void;
  selectedDonor?: Donor | null;
  showUserLocation?: boolean;
}

// Component to handle map events and updates
function MapController({ center, donors, onDonorSelect, selectedDonor }: InteractiveMapProps) {
  const map = useMap();

  useEffect(() => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
}

export default function InteractiveMap({ 
  center, 
  donors, 
  onDonorSelect, 
  selectedDonor,
  showUserLocation = true 
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  const handleContactDonor = (donor: Donor) => {
    const message = encodeURIComponent(
      `Hello! I found your profile on PulseConnect and I'm looking for ${donor.bloodGroup} blood. Could you please help? Thank you!`
    );
    const whatsappUrl = `https://wa.me/${donor.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const calculateTimeSinceLastDonation = (lastDonationDate: string | null): string => {
    if (!lastDonationDate) return "No previous donations";
    
    const donationDate = new Date(lastDonationDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - donationDate.getTime());
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 1) return "Less than a month ago";
    if (diffMonths === 1) return "1 month ago";
    return `${diffMonths} months ago`;
  };

  // Default center if none provided
  const mapCenter: [number, number] = center && center[0] !== 0 && center[1] !== 0 
    ? center 
    : [40.7128, -74.0060]; // Default to NYC

  return (
    <div className="w-full h-full relative" data-testid="interactive-map">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController 
          center={center}
          donors={donors}
          onDonorSelect={onDonorSelect}
          selectedDonor={selectedDonor}
        />

        {/* User location marker */}
        {showUserLocation && center && center[0] !== 0 && center[1] !== 0 && (
          <Marker position={center} icon={userLocationIcon}>
            <Popup>
              <div className="text-center p-2">
                <MapPin className="mx-auto mb-2 text-accent" size={20} />
                <p className="font-medium">Your Location</p>
                <p className="text-sm text-muted-foreground">Search center</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Donor markers */}
        {donors.map((donor) => (
          <Marker
            key={donor.id}
            position={[parseFloat(donor.latitude), parseFloat(donor.longitude)]}
            icon={selectedDonor?.id === donor.id ? selectedDonorIcon : donorIcon}
            eventHandlers={{
              click: () => onDonorSelect(donor),
            }}
          >
            <Popup>
              <div className="w-64 p-2" data-testid={`popup-donor-${donor.id}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <span className="text-secondary font-bold">{donor.bloodGroup}</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{donor.fullName}</h5>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin size={12} />
                        <span>{donor.distance.toFixed(1)} km away</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-xs text-secondary font-medium">Available</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last donation:</span>
                    <span className="text-foreground">
                      {calculateTimeSinceLastDonation(donor.lastDonationDate ? donor.lastDonationDate.toString() : null)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits earned:</span>
                    <span className="text-foreground font-medium">{donor.credits} credits</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total donations:</span>
                    <span className="text-foreground font-medium">{donor.totalDonations}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleContactDonor(donor)}
                    data-testid={`button-contact-donor-${donor.id}`}
                  >
                    <Phone size={14} className="mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => onDonorSelect(donor)}
                    data-testid={`button-view-donor-${donor.id}`}
                  >
                    View
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-sm">
        <h4 className="font-medium text-sm mb-2">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span>Available Donors</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Selected Donor</span>
          </div>
        </div>
      </div>

      {/* Donors count indicator */}
      <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <Heart className="text-secondary" size={16} />
          <span className="text-sm font-medium">
            {donors.length} {donors.length === 1 ? 'donor' : 'donors'} found
          </span>
        </div>
      </div>
    </div>
  );
}
