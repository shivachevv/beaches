import { Avatar } from "@mui/material";
import React from "react";
import { BeachModel } from "../../interfaces";
import FlagIcon from "@mui/icons-material/Flag";

import { getBeachFlagColor } from "../../utils/helpers";
type Props = {
  beach: BeachModel | null;
  size?: string;
};

const BeachFlag: React.FC<Props> = ({ beach, size }: Props) => {
  return (
    <Avatar
      data-testid="avatar"
      sx={{
        bgcolor: getBeachFlagColor(beach?.flag),
        width: size,
        height: size,
      }}
    >
      <FlagIcon data-testid="flag-icon" />
    </Avatar>
  );
};

export default BeachFlag;
