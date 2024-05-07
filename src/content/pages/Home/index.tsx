import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [isPostcodeSearch, setIsPostcodeSearch] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    dispatch(clearMembers());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: "background.default"
      }}
    >
      <Box
        sx={{
          width: "100vw",
          overflow: "hidden",
          bgcolor: "background.paper",
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
        sx={{ py: "50px" }}
      >
        <Typography fontSize="h1.fontSize" fontFamily="h1.fontFamily">
          Welcome to Votewatch
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <MemberPostcodeSearch onSearch={() => setIsPostcodeSearch(true)} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <MemberNameSearch onSearch={() => setIsPostcodeSearch(false)} />
        </Box>
        {fetchMembersStatus === SliceStatusEnum.LOADING ? (
          <LoadingSpinner />
        ) : (
          <>
            {isPostcodeSearch !== null && (
              <Typography fontSize={20}>
                {isPostcodeSearch ? "Your local MP is:" : "Search results:"}
              </Typography>
            )}
            {members?.map((member) => (
              <Button
                key={member.value.id}
                sx={{ color: "secondary.main", textTransform: "capitalize" }}
                onClick={() => {
                  dispatch(setSelectedMember(member));
                  navigate(`/member/${member?.value?.id}`);
                }}
              >
                {member.value.nameDisplayAs}
              </Button>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Home;
