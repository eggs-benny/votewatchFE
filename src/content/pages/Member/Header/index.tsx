import { Box, Typography, useTheme } from "@mui/material";
import { Member } from "src/models/member";

interface HeaderProps {
  member: Member;
}

function Header({ member }: HeaderProps) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "background.paper",
          py: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/owl-logo.png"
          style={{
            width: 120,
            height: 120,
            marginBottom: "10px"
          }}
          alt={"Votewatch Owl Logo"}
        />
        <Typography
          fontSize="h1.fontSize"
          fontFamily="h1.fontFamily"
          color={theme.palette.background.default}
        >
          {member.value?.nameFullTitle}
        </Typography>
      </Box>
    </>
  );
}

export default Header;
