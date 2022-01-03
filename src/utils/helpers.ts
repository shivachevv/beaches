import { makeStyles } from "@material-ui/core/styles";
import { noDataColor } from "./constants";
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

  const AVAILABILITY_PERCENTAGE_COLOR = { // if we want to use numbers its good to set them in miningfull variables
    GREEN: 33,
    YELLOW: 66
  }

  const freePercentage = (available / capacity) * 100;

  if (freePercentage <= AVAILABILITY_PERCENTAGE_COLOR.GREEN) {
    return { bgcolor: "green", color: "white" };
  }
  if (freePercentage > AVAILABILITY_PERCENTAGE_COLOR.GREEN && freePercentage <= AVAILABILITY_PERCENTAGE_COLOR.YELLOW) {
    return { bgcolor: "yellow", color: "black" };
  }
  return { bgcolor: "red", color: "white" };
};
