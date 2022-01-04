import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Beach } from "../../interfaces";
import beachIcon from "../../assets/images/beach-map-icon.png";
import MarkerExpandedContent from "./../MarkerExpandedContent/";
// import ReactDOMServer from "react-dom/server";
import { renderToString } from "react-dom/server";

type Props = {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  beaches: Beach[];
  reserve: (beach: Beach) => void;
};

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const BeachMap: React.FC<Props> = ({
  mapType,
  mapTypeControl,
  beaches,
  reserve,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<any>();

  const initMap = (zoom: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoom,
          center: address,
          mapTypeControl: mapTypeControl,
          scaleControl: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          mapTypeId: mapType,
          draggableCursor: "pointer",
        })
      );
    }
  };
  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(
      42.694262301610465,
      27.728529316326895
    );
    initMap(8, defaultAddress);
  };
  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };
  useEffect(startMap, [map]);
  useEffect(() => {
    beaches.forEach((beach) => {
      addMarker(beach);
    });
  }, [beaches, map]);

  const addMarker = (beach: Beach): void => {
    const location = new google.maps.LatLng(
      beach.coordinates.lat,
      beach.coordinates.lng
    );
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: beachIcon,
      title: beach.name,
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: renderToString(
        <MarkerExpandedContent reserve={reserve} beach={beach} />
      ),
    });
    marker.addListener("click", () => infoWindow.open(map, marker));
  };

  return (
    <Box
      sx={{ mt: 2, width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Box ref={ref} sx={{ width: "500px", height: "500px" }}></Box>
    </Box>
  );
};

export default BeachMap;
