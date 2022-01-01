import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Chip,
  Collapse,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Beach } from "../../interfaces";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import FlagIcon from "@mui/icons-material/Flag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  getBeachAvailabilityColor,
  getBeachFlagColor,
} from "../../utils/helpers";
type Props = {
  beach: Beach | null;
  reserve: (beach: Beach | null) => void;
};

const SelectedBeach: React.FC<Props> = ({ beach, reserve }: Props) => {
  const getBeachFreeSeats = (): string => {
    return "";
  };

  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Box sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="80"
              image={`./images/beaches/${beach?.slug}.jpg`}
              alt={beach?.name}
            />
          </Box>
        }
        titleTypographyProps={{ variant: "h6" }}
        title={beach?.name}
        subheader={getBeachFreeSeats()}
        style={{ textAlign: "left" }}
      />

      <CardActions disableSpacing sx={{ flexDirection: "column" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: getBeachFlagColor(beach?.flag) }}>
              <FlagIcon />
            </Avatar>
            <Box
              sx={{
                bgcolor: getBeachAvailabilityColor({
                  capacity: beach?.capacity,
                  available: beach?.available,
                }).bgcolor,
                color: getBeachAvailabilityColor({
                  capacity: beach?.capacity,
                  available: beach?.available,
                }).color,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                padding: "7px",
                ml: 2,
              }}
            >
              <BeachAccessIcon
                sx={{
                  color: getBeachAvailabilityColor({
                    capacity: beach?.capacity,
                    available: beach?.available,
                  }).color,
                  mr: 1,
                }}
                fontSize="medium"
              />
              {`${beach?.available} / ${beach?.capacity}`}
            </Box>
          </Box>
          <Box>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleExpand}>
              <ExpandMoreIcon
                sx={{
                  transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.2s",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ mt: 1 }} paragraph>
              {beach?.description}
            </Typography>
          </CardContent>
        </Collapse>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Button
            fullWidth
            sx={{ py: 1, px: 2 }}
            variant="contained"
            endIcon={<BeachAccessIcon />}
            onClick={() => reserve(beach)}
          >
            Reserve
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default SelectedBeach;
