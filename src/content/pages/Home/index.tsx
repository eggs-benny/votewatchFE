import { Typography } from "@mui/material";
import { ReactNode } from "react";
import MemberNameSearch from "./MemberNameSearch";
import MemberPostcodeSearch from "./MemberPostcodeSearch";
import { useSelector } from "src/store";
import {
  selectMembers,
  selectMembersStatus,
  SliceStatusEnum
} from "src/slices/member";
import LoadingSpinner from "src/components/Shared/LoadingSpinner";

function Home() {
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
          <Typography key={member.value.id}>
            {member.value.nameDisplayAs}
          </Typography>
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
