import { Email } from "@mui/icons-material";
import { Box } from "@mui/material";

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
        sx={{
          color: "#FFA500",
          height: "60%",
          width: "60%",
          margin: "auto"
        }}
      />
    </Box>
  );
}

export default ModalIcon;
