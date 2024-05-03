import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import MemberNameSearch from "./MemberNameSearch";
import MemberPostcodeSearch from "./MemberPostcodeSearch";
import { useDispatch, useSelector } from "src/store";
import {
  clearMembers,
  selectMembers,
  selectMembersStatus,
  setSelectedMember,
  SliceStatusEnum
} from "src/slices/member";
import LoadingSpinner from "src/components/Shared/LoadingSpinner";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector(selectMembers);
  const fetchMembersStatus = useSelector(selectMembersStatus);
  const [isPostcodeSearch, setIsPostcodeSearch] = useState<boolean>(null);

  useEffect(() => {
    dispatch(clearMembers());
  }, [dispatch]);

  let membersList: ReactNode;
  let heading: ReactNode = null;
  switch (fetchMembersStatus) {
    case SliceStatusEnum.SUCCEEDED:
      membersList = members?.map((member) => {
        return (
          <Button
            key={member.value.id}
            onClick={() => {
              dispatch(setSelectedMember(member));
              navigate(`/member/${member?.value?.id}`);
            }}
          >
            {member.value.nameDisplayAs}
          </Button>
        );
      });
      if (isPostcodeSearch !== null) {
        heading = (
          <Typography fontSize={20} fontFamily={"Roboto Slab"}>
            {isPostcodeSearch ? "Your local MP is:" : "Search results:"}
          </Typography>
        );
      }
      break;
    case SliceStatusEnum.LOADING:
      membersList = <LoadingSpinner />;
      break;
  }

  return (
    <Box
      sx={{ width: "100vw", minHeight: "100vh", backgroundColor: "#fffdeb" }}
    >
      <Box
        sx={{
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#012e31",
          py: "50px"
        }}
      >
        <img
          src="/owl-logo.png"
          style={{
            width: 250,
            height: 250,
            borderRadius: 25,
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)"
          }}
          alt={"Votewatch Owl Logo"}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ py: "50px", color: "#012e31" }}
      >
        <Typography fontSize={40} fontFamily={"Roboto Slab"}>
          Welcome to Votewatch
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <MemberPostcodeSearch onSearch={() => setIsPostcodeSearch(true)} />
          <MemberNameSearch onSearch={() => setIsPostcodeSearch(false)} />
        </Box>
        {heading}
        {membersList}
      </Box>
    </Box>
  );
}

export default Home;
