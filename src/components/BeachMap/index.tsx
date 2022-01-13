import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { BeachModel } from "../../interfaces";
import beachIcon from "../../assets/images/beach-map-icon.png";
import MarkerExpandedContent from "./../MarkerExpandedContent/";
import { renderToString } from "react-dom/server";

type Props = {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  beaches: BeachModel[];
  reserve: (beach: BeachModel) => void;
  selectedBeach: BeachModel | null;
};

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type Marker = google.maps.Marker;
type InfoWindow = google.maps.InfoWindow;
type MapsEventListener = google.maps.MapsEventListener;

const BeachMap: React.FC<Props> = ({
  mapType,
  mapTypeControl,
  beaches,
  selectedBeach,
  reserve,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleMap>();
  const [infoWindow, setInfo] = useState<InfoWindow>();
  const [listenerArray, setListenerArray] = useState<MapsEventListener[]>([]);

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
  useEffect(() => {
    setSelectedBeachCenter(selectedBeach);
  }, [selectedBeach]);

  const addOnClickToReserveBtn = (beach: BeachModel): void => {
    document
      .querySelector("#info-window-reserve")
      ?.addEventListener("click", () => reserve(beach));
  };

  const addInfoWindow = (beach: BeachModel, marker: Marker): void => {
    const newInfoWindow = new window.google.maps.InfoWindow({
      content: renderToString(<MarkerExpandedContent beach={beach} />),
    });

    setInfo((existingInfoWindow) => {
      listenerArray.forEach((listener) => {
        google.maps.event.removeListener(listener);
      });

      if (existingInfoWindow) {
        existingInfoWindow.close();
      }

      return newInfoWindow;
    });

    newInfoWindow.open(map, marker);

    const listener = google.maps.event.addListener(
      newInfoWindow,
      "domready",
      () => addOnClickToReserveBtn(beach)
    );
    setListenerArray((listenerArray) => [...listenerArray, listener]);
  };

  const addMarker = (beach: BeachModel): void => {
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

    marker.addListener("click", () => addInfoWindow(beach, marker));
  };

  const setSelectedBeachCenter = (selectedBeach: BeachModel | null): void => {
    if (selectedBeach) {
      map?.setCenter(
        new google.maps.LatLng(
          selectedBeach.coordinates.lat,
          selectedBeach.coordinates.lng
        )
      );
      map?.setZoom(11);
    }
  };

  const goToClosest = (): void => {
    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const currentPosition = new google.maps.LatLng(latitude, longitude);
      const beachesToCurrent = [...beaches].sort((beach1, beach2) => {
        const beachPosition1 = new google.maps.LatLng(
          beach1.coordinates.lat,
          beach1.coordinates.lng
        );
        const beachPosition2 = new google.maps.LatLng(
          beach2.coordinates.lat,
          beach2.coordinates.lng
        );
        const distance1 = google.maps.geometry.spherical.computeDistanceBetween(
          currentPosition,
          beachPosition1
        );
        const distance2 = google.maps.geometry.spherical.computeDistanceBetween(
          currentPosition,
          beachPosition2
        );
        return distance1 - distance2;
      });

      setSelectedBeachCenter(beachesToCurrent[0]);
      addMarker(beachesToCurrent[0]);
    };

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);

    return;
  };

  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        sx={{ py: 1, px: 2, mb: 2, width: "50%" }}
        variant="contained"
        onClick={() => goToClosest()}
      >
        Go to closest
      </Button>
      <Box ref={ref} sx={{ width: "50%", height: "500px" }}></Box>
    </Box>
  );
};

export default BeachMap;
