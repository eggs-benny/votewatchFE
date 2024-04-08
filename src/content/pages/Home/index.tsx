import { Typography } from "@mui/material";
import { useState } from "react";
import { Member } from "src/models/member";
import MemberNameSearch from "./MemberSearch";

function Home() {
  // welcome

  // Find your local MP
  // Enter postcode

  // Find an MP

  // MP List
  const [members, setMembers] = useState<Member[]>([]);

  return (
    <>
      <Typography>Welcome to Votewatch</Typography>
      <Typography>Enter your postcode to find your local MP:</Typography>
      <MemberNameSearch setMembers={setMembers} />
      {members?.map((member) => {
        return (
          <Typography key={member.value.id}>
            {member.value.nameDisplayAs}
          </Typography>
        );
      })}
    </>
  );
}

export default Home;
