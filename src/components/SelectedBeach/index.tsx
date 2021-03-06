import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Collapse,
} from "@mui/material";
import React, { useState } from "react";
import { BeachModel } from "../../interfaces";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BeachFlag from "./../BeachFlag/index";
import { getBeachAvailabilityColor } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

type Props = {
  beach: BeachModel | null;
  reserve: (beach: BeachModel | null) => void;
  isBeachAdmin: boolean;
};

const SelectedBeach: React.FC<Props> = ({
  beach,
  reserve,
  isBeachAdmin,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
    >
      <Card sx={{ width: 400 }}>
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
              <BeachFlag beach={beach} />
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
              {isBeachAdmin && (
                <IconButton onClick={() => navigate(`/beaches/${beach?.id}`)}>
                  <EditIcon />
                </IconButton>
              )}
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
    </Box>
  );
};

export default SelectedBeach;
