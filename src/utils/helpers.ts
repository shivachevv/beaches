import { makeStyles } from "@material-ui/core/styles";
import { apiKey, noDataColor } from "./constants";
import { BeachFlags } from "./enums";

type Flag = BeachFlags.GREEN | BeachFlags.YELLOW | BeachFlags.RED;

type BeachAvailabilityColors = {
  bgcolor: string;
  color: string;
};

export const useStyles = (styles: Record<string, any>) => {
  const result = makeStyles(styles);
  return result();
};

export const setPageTitle = (title: string): void => {
  document.title = title;
  return;
};

export const getBeachFlagColor = (flag: any): string => {
  const assignedFlag = flag;

  const innerFlag: Flag = assignedFlag;

  if (!flag) {
    return noDataColor;
  }

  const flagsColorMap = {
    [BeachFlags.GREEN]: "green",
    [BeachFlags.YELLOW]: "yellow",
    [BeachFlags.RED]: "red",
  };

  return flagsColorMap[innerFlag];
};

export const getBeachAvailabilityColor = ({
  capacity,
  available,
}: {
  capacity: number | undefined;
  available: number | undefined;
}): BeachAvailabilityColors => {
  if (!capacity || !available) {
    return { bgcolor: noDataColor, color: noDataColor };
  }

  const freePercentage = (available / capacity) * 100;

  if (freePercentage <= 33) {
    return { bgcolor: "green", color: "white" };
  }
  if (freePercentage > 33 && freePercentage <= 66) {
    return { bgcolor: "yellow", color: "black" };
  }
  return { bgcolor: "red", color: "white" };
};

export const loadMapApi = () => {
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,places&language=en&v=quarterly`;
  const scripts = document.getElementsByTagName("script");
  // Go through existing script tags, and return google maps api tag when found.
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement("script");
  googleMapScript.src = mapsURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};
