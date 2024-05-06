export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  minHeight: "390px",
  bgcolor: "#012e31",
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
    backgroundColor: "#fffdeb",
    borderRadius: "10px"
  }
};

export const modalCancelButtonStyle = {
  color: "#fffdeb",
  fontFamily: "Roboto Slab",
  fontWeight: 400,
  fontSize: "16px",
  marginRight: "30px"
};

export const modalActionButtonStyle = {
  backgroundColor: "#021d32",
  color: "#fffdeb",
  textTransform: "capitalize",
  marginLeft: "30px",
  padding: "10px 30px",
  fontFamily: "Roboto Slab",
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
  fontFamily: "Roboto Slab",
  color: "#fffdeb",
  padding: "5px",
  marginBottom: "15px"
};

export const modalSubtextStyle = {
  fontSize: "15px",
  fontFamily: "Roboto Slab",
  textAlign: "left",
  fontWeight: "400",
  color: "#fffdeb",
  padding: "5px"
};
