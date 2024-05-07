import { Typography, useTheme } from "@mui/material";

const ResultTypography = ({ vote }: { vote: boolean }) => {
  const voteResult = vote ? "AYE" : "NO";
  const color = vote ? "forestgreen" : "firebrick";  
  const theme = useTheme()
  return (
    <Typography
      style={{
        fontSize: 60,
        fontFamily: theme.typography.h1.fontFamily,
        color: color,
        fontWeight: "900",
        alignItems: "center"
      }}
    >
      {voteResult}
    </Typography>
  );
};

export default ResultTypography;
