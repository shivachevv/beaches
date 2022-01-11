import { Avatar } from "@mui/material";
import React from "react";
import { Beach } from "../../interfaces";
import FlagIcon from "@mui/icons-material/Flag";

import { getBeachFlagColor } from "../../utils/helpers";
type Props = {
  beach: Beach | null;
  size?: string;
};

const BeachFlag: React.FC<Props> = ({ beach, size }: Props) => {
  return (
    <Avatar
      sx={{
        bgcolor: getBeachFlagColor(beach?.flag),
        width: size,
        height: size,
      }}
    >
      <FlagIcon />
    </Avatar>
  );
};

export default BeachFlag;
