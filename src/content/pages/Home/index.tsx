import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";
import MemberNameSearch from "./MemberNameSearch";
import MemberPostcodeSearch from "./MemberPostcodeSearch";
import { useDispatch, useSelector } from "src/store";
import {
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
  // welcome

  // Find your local MP
  // Enter postcode

  // Find an MP

  // MP List
  const members = useSelector(selectMembers);
  const fetchMembersStatus = useSelector(selectMembersStatus);

  // const [localMp, setLocalMp] = useState<MpData>()

  let membersList: ReactNode;
  switch (fetchMembersStatus) {
    case SliceStatusEnum.SUCCEEDED:
      membersList = members?.map((member) => {
        return (
          <Button
            key={member.value.id}
            onClick={()=>{
              dispatch(setSelectedMember(member))
              navigate(`/member/${member?.value?.id}`)
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
      {/* <MemberPostcodeSearch */}

      <MemberNameSearch />
      {membersList}
    </>
  );
}

export default Home;
