import { Box, Typography } from "@mui/material";
import { Member } from "src/models/member";

interface HeaderProps {
  member: Member;
}

function Header({ member }: HeaderProps) {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#012e31",
          py: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
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
        <Typography fontSize={30} fontFamily="Roboto Slab" color="#fffdeb">
          {member.value?.nameFullTitle}
        </Typography>
      </Box>
    </>
  );
}

export default Header;
