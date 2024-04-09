import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Division } from "src/models/division";
import { selectSelectedMember } from "src/slices/member";

function Member() {
  const member = useSelector(selectSelectedMember);
  const [votes, setVotes] = useState<Division[]>();
  const divisionDate = (date: Date) => new Date(date).toLocaleDateString();

  const fetchMemberVotes = async (memberId: number) => {
    const response = await fetch(
      `https://commonsvotes-api.parliament.uk/data/divisions.json/membervoting?queryParameters.memberId=${memberId}`
    );
    const voteData: Division[] = await response.json();
    setVotes(voteData);
  };

  useEffect(() => {
    fetchMemberVotes(member.value.id);
  }, [member.value.id]);

  return (
    <>
      <Typography>Your MP</Typography>
      <Typography>{member.value?.nameFullTitle}</Typography>
      <img src={member.value.thumbnailUrl} alt={member.value.nameFullTitle} />
      {votes?.map((vote) => {
        console.log(vote.PublishedDivision.Title);
        return (
          <Box key={vote.PublishedDivision.DivisionId}>
            <Typography>{divisionDate(vote.PublishedDivision.Date)}</Typography>
            <Typography>{vote.PublishedDivision.Title}</Typography>
          </Box>
        );
      })}
      Recent bills: Carousel Date of bill Email your MP about this
      Approve/Disapprove
    </>
  );
}
export default Member;
