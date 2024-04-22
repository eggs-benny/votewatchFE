import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";
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

  useEffect(() => {
    dispatch(clearMembers());
  }, [dispatch]);

  let membersList: ReactNode;
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
      break;
    case SliceStatusEnum.LOADING:
      membersList = <LoadingSpinner />;
      break;
  }

  return (
    <>
      <Typography>Welcome to Votewatch</Typography>
      <Box display="flex" flexDirection="row" alignItems="center">
      <MemberPostcodeSearch />
      <MemberNameSearch />
      </Box>
      {membersList}
    </>
  );
}

export default Home;
