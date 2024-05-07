import { Email } from "@mui/icons-material";
import { Box } from "@mui/material";
import { modalIconStyle } from "src/styles/modal";

function ModalIcon() {
  return (
    <Box
      sx={{
        backgroundColor: "#FCE9C6",
        height: "125px",
        width: "125px",
        borderRadius: "100px",
        margin: "auto",
        display: "flex",
        marginBottom: "20px"
      }}
    >
      <Email
        sx={modalIconStyle}
      />
    </Box>
  );
}

export default ModalIcon;
