import * as React from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

type Props = {
  children?: any;
  open: any;
  close: any;
  isOpen: boolean;
  modalStyles?: Record<string, string>;
};

const ModalComponent: React.FC<Props> = ({
  children,
  open,
  close,
  isOpen,
  modalStyles
}: Props) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalStyles?.width || 400,
    height: modalStyles?.height || 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "hidden"
    // p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
