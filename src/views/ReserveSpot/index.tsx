import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { setPageTitle } from "../../utils/helpers";
import { PageTitles } from "../../utils/enums";

type Props = Record<string, unknown>;

const ReserveSpot: React.FC<Props> = (props: Props) => {
  const { beachId } = useParams();
  useEffect(() => {
    setPageTitle(PageTitles.RESERVE_SPOT);
  }, []);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: 2,
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgb(255 255 255 / 49%)",
      }}
    >
      reservespot
      <span>{beachId}</span>
    </Container>
  );
};

export default ReserveSpot;
