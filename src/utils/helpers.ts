import { makeStyles } from "@material-ui/core/styles";
import { GOOGLE_MAPS_API_KEY, NO_DATA_COLOR } from "./constants";
import { BEACH_FLAGS } from "./enums";
import { UserModel } from "./../interfaces/index";

type Flag = BEACH_FLAGS.GREEN | BEACH_FLAGS.YELLOW | BEACH_FLAGS.RED;

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
    return NO_DATA_COLOR;
  }

  const flagsColorMap = {
    [BEACH_FLAGS.GREEN]: "green",
    [BEACH_FLAGS.YELLOW]: "yellow",
    [BEACH_FLAGS.RED]: "red",
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
    return { bgcolor: NO_DATA_COLOR, color: NO_DATA_COLOR };
  }

  const AVAILABILITY_PERCENTAGE_COLOR = {
    // if we want to use numbers its good to set them in miningfull variables
    GREEN: 33,
    YELLOW: 66,
  };

  const freePercentage = (available / capacity) * 100;

  if (freePercentage <= AVAILABILITY_PERCENTAGE_COLOR.GREEN) {
    return { bgcolor: "green", color: "white" };
  }
  if (
    freePercentage > AVAILABILITY_PERCENTAGE_COLOR.GREEN &&
    freePercentage <= AVAILABILITY_PERCENTAGE_COLOR.YELLOW
  ) {
    return { bgcolor: "yellow", color: "black" };
  }
  return { bgcolor: "red", color: "white" };
};

export const loadMapApi = () => {
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,places&language=en&v=quarterly`;
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

export const getUserLetters = (user: UserModel) =>
  `${user?.firstName[0]} ${user?.lastName[0]}`.toLocaleUpperCase();
