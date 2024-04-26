import { Typography } from "@mui/material";

interface ResultTypographyProps {
  voteResult: string;
  color: string;
}

const ResultTypography = ({ voteResult, color }: ResultTypographyProps) => {
  return (
    <Typography
      style={{
        fontSize: 60,
        fontFamily: "Roboto Slab",
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
