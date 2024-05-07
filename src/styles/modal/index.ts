export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minHeight: "30vh",

  bgcolor: "#006064",
  backgroundImage: `linear-gradient(to top, #012e31, transparent)`,
  border: "3px solid #fffdeb",
  boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  p: 4,
  textAlign: "center"
};

export const modalTextFieldStyle = {
  marginBottom: "20px",
  padding: "3px",
  borderRadius: "10px",
  "& .MuiInputBase-root": {
    backgroundColor: "background.default",
    borderRadius: "10px"
  }
};

export const modalCancelButtonStyle = {
  color: "background.default",
  fontWeight: 400,
  textTransform: "capitalize",
  fontSize: "16px",
  marginRight: "30px"
};

export const modalActionButtonStyle = {
  backgroundColor: "secondary.main",
  color: "background.default",
  textTransform: "capitalize",
  marginLeft: "30px",
  padding: "10px 30px",
  fontWeight: 700,
  fontSize: "16px"
};

export const modalIconStyle = {
  color: "#FFA500",
  height: "60%",
  width: "60%",
  margin: "auto"
};

export const modalTextStyle = {
  fontSize: "23px",
  fontWeight: "bold",
  color: "background.default",
  padding: "5px",
  marginBottom: "15px"
};

export const modalSubtextStyle = {
  fontSize: "15px",
  textAlign: "left",
  fontWeight: "400",
  color: "background.default",
  padding: "5px"
};
