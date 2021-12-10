import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Button variant="contained">Hello World</Button>
      <DeleteIcon />
    </div>
  );
};

export default Home;
